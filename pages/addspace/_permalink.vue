<template>
   <div class="m-5 p-4 text-left">
   <div class="text-center" v-if="isLoading">
      <a-spin />
   </div>
   <div v-else>
      <a-steps :current="current">
         <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div  class="steps-content">
         <div v-if="current === 0">
            <h1 class="heading">About your space</h1>
            <div v-if="isNew">
              <h1 class="second-heading">What's your space is for?</h1>
              <a-radio-group  v-model="listing.type_id" size="large" @change="getCusotmFields">
                  <a-radio-button
                    v-for="(type, i) in typeOptions"
                    :value="type.value"
                    :key="i"
                    >{{ type.label }}</a-radio-button>
              </a-radio-group>
            </div>
            <div v-if="customFields">
              <div class="mt-4 col-md-8 px-0">
                    <b-form-group
                        id="fieldset-1"
                        description="Min 10 characters"
                        label="Name your space"
                        label-for="input-1">
                     <a-input id="input-1" label="Fail" placeholder="Give your listing a title" size="large" v-model="listing.title" /> 
                     <sub style="margin-top:5px;" class="pull-right">{{titlecharactercount}}/100</sub>
                  </b-form-group>

              </div>
              <div class="mt-4 col-md-8 px-0">
                <b-form-group
                  id="fieldset-1"
                  description="Min 50 characters"
                  label="Describe your space"
                  label-for="input-2">
                  <a-textarea
                      id="input-2"
                      placeholder="Give your listing a great description"
                      :rows="4"
                      v-model="listing.description"/>
                      <sub style="margin-top:5px;" class="pull-right">{{listing_description_count}}/50</sub>
                  </b-form-group>

              </div>
              <div class="mt-4 col-md-8 px-0">
                <no-ssr>
                    <div class="mb-4">
                      <h1 class="second-heading">Locate your space</h1>
                      <gmap-autocomplete   :componentRestrictions="country" @place_changed="setPlace"   class="ant-input ant-input-lg"></gmap-autocomplete>
                    </div>
                    <gmap-map :center="center" :zoom="20" @click="newLocation" style="width:100%;  height: 400px;" >
                      <gmap-marker
                          @drag="updateCoordinates"
                          @dragend="updateCoordinatesEnd"
                          v-if="currentPlace"
                          :position="currentPlace"
                          :draggable="true"
                          />
                    </gmap-map>
                </no-ssr>
              </div>
            </div>
         </div>
         <div v-else-if="current === 1">
            <h1 class="heading">Select Featured Image</h1>
            <div class="clearfix">
                <a-upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  :fileList="featured_image"
                  @preview="handlePreview"
                  @change="handleNewChange"
                >
                  <div v-if="featured_image.length < 1">
                    <a-icon type="plus" />
                    <div class="ant-upload-text">Upload</div>
                  </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
            </div>
            <h1 class="heading">Photos of your space</h1>
            <div class="clearfix">
               <a-upload
                  listType="picture-card"
                  :fileList="fileList"
                  :multiple="true"
                  @change="handleChange"
                  @preview="handlePreview">
                  <div>
                    <a-icon type="plus" />
                     <div class="ant-upload-text">Upload</div>
                  </div>
               </a-upload>
               <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
               </a-modal>
            </div>
         </div>
         <div v-else-if="current === 2">
            <div v-if="group!='SEO Metatags'" v-for="(group, i) in Object.keys(customFields)" :key="i" class="row">
               <h1 class="heading col-md-12 my-2">{{ group }}</h1>
               <div v-for="(field, j) in customFields[group]" :key="j" class="col-md-6">
                  <div v-if="field.field_type === 'boolean'" class="row my-2">
                     <div
                        class="col-md-6"
                        >{{ field.form_message || field.form_placeholder || field.form_name || field.name }}</div>
                     <div class="col-md-6">
                        <a-switch v-model="field.value" size="large">
                           <a-icon type="check" slot="checkedChildren" />
                           <a-icon type="close" slot="unCheckedChildren" />
                        </a-switch>
                     </div>
                  </div>
                  <div v-else-if="field.field_type === 'text'" class="row my-2">
                     <div
                        class="col-md-6"
                        >{{ field.form_message || field.form_placeholder || field.form_name || field.name }}</div>
                     <div class="col-md-6">
                        <a-input v-model="field.value" :placeholder="field.form_placeholder" />
                     </div>
                  </div>
                  <div v-else-if="field.field_type === 'number'" class="row my-2">
                     <div
                        class="col-md-6"
                        >{{ field.form_message || field.form_placeholder || field.form_name || field.name }}</div>
                     <div class="col-md-6">
                        <a-input-number v-model="field.value" :placeholder="field.form_placeholder" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div v-else-if="current === 3">
            <div class="row">
               <div class="col-md-6">
                  <h1 class="heading">Timings</h1>
               </div>
               <div class="col-md-6">
                  <button class="button" @click="showModal" style="margin-left: 8px" >Add New</button>
               </div>
            </div>
            <div class="clearfix">
               <a-table v-if="timings.length>0" :columns="timing_options" :dataSource="timings">
                    <a-time-picker slot="time_start" slot-scope="text" :minuteStep="15" :secondStep="10" v-model="text" />
                    <a-time-picker slot="time_end" slot-scope="text" :minuteStep="15" :secondStep="10" v-model="text" />
                     <a-radio-group slot="slot" slot-scope="text" v-model="text">
                           <a-radio-button value="per_day">Per day</a-radio-button>
                           <a-radio-button value="per_shift">Per shift</a-radio-button>
                           <a-radio-button value="per_hour">Per hour</a-radio-button>
                      </a-radio-group>
                <span slot="timings_conf_id" slot-scope="item,index" v-if="!index.is_active">
                  <a href="javascript:;" @click="activateSlots(item)" >Activate</a>
                </span>
              </a-table>
            </div>
            <!-- <h1 class="heading mt-4">Pricing</h1> -->
            <div class="row" style="margin-top:10px;">
              <div class="col-md-12">
                  <b-card class="mb-4" title="Base Price">                        
                        <div class="row">
                           <div class="col-md-12">
                              <b-card class="mb-12"  style="border:none;">
                                 <div class="row">
                                    <div class="col-md-2">
                                       <b-form-group label="Rent">
                                          <b-form-input v-model="base_price.base_rent" type="text" />
                                       </b-form-group>
                                    </div>
                                    <div class="col-md-2">
                                       <b-form-group label="Effective Date">
                                          <b-form-input  v-model="base_price.effective_date" type="date"  />
                                       </b-form-group>
                                    </div>
                                    <div class="col-md-2">
                                       <b-form-group label="Expiry Date">
                                          <b-form-input  v-model="base_price.expiration_date" type="date"  />
                                       </b-form-group>
                                    </div>
                                    <div class="col-md-2">
                                       <b-form-group   label="Is waivable">
                                          <b-form-checkbox size="lg" v-model="base_price.is_waivable" name="check-button" switch></b-form-checkbox >
                                       </b-form-group>
                                    </div>
                                     <div class="col-md-2">
                                       <b-form-group  label="Is Required">
                                          <b-form-checkbox v-model="base_price.is_required" name="check-button" switch></b-form-checkbox >
                                       </b-form-group>
                                    </div>
                                    <div class="col-md-2" v-if="base_price.is_waivable==true">
                                       <b-form-group label="Waive of people at">
                                          <b-form-input v-model="base_price.waive_off_at" type="number" />
                                       </b-form-group>
                                    </div> 
                                 </div>
                              </b-card>
                           </div>
                        </div>
                        <div class="row">
                           <div  class="col-md-12">
                              <!-- @click="saveAddOns()" -->
                              <b-button v-if="!basePriceExists" @click="saveBasePrice()" style="margin-left:10px;" size="sm"  class="button mt-4 pull-right">Save Price</b-button>
                              <b-button v-else @click="updateBasePrice()" style="margin-left:10px;" size="sm"  class="mt-4 pull-right button">Update</b-button>

                           </div>
                        </div>
                     </b-card>
               </div>
               <div class="col-md-12">
                  <b-card class="mb-4" title="Create AddOns" >
                     <b-card class="mb-4" style="border:none;">
                        <div class="row">
                           <div class="col-md-6">
                              <b-form-group label="Add More AddOns">
                                 <b-button @click="fillAddOnFields('Heating',null,0)" class="mb-2" size="sm" variant="primary">Heating</b-button>
                                 <b-button @click="fillAddOnFields('AC',null,0)" class="mb-2" size="sm" variant="secondary">AC</b-button>
                                 <b-button @click="fillAddOnFields('Demo',null,0)" class="mb-2" size="sm" variant="warning">
                                    <font-awesome-icon icon="plus" :style="{ color: 'white' }"  />
                                 </b-button>
                              </b-form-group>
                           </div>
                        </div> 
                        <!-- v-for="addon_field_item in pricings" v-if="addon_field_item.product_type=='addons'" v-bind:key="addon_field_item.key" -->
                        <div class="row" >
                           <div class="col-md-12" >
                              <b-card class="mb-12" :title="addon_field_item.name">
                                 <div class="row">
                                    <div class="col-md-2">
                                       <b-form-group label="AddOn Title">
                                          <b-form-input v-model="addon_field_item.name" type="text" />
                                       </b-form-group>
                                    </div>
                                    <div class="col-md-2">
                                       <b-form-group label="Base Rent">
                                          <b-form-input v-model="addon_field_item.Pricing[0].rate" type="number" />
                                       </b-form-group>
                                    </div>
                                    <div class="col-md-2">
                                       <b-form-group  label="Effective Date">
                                          <b-form-input v-model="addon_field_item.Pricing[0].effective_date" type="date"/>
                                       </b-form-group>

                                    </div>
                                    <div class="col-md-2">
                                       <b-form-group label="Expiry Date">
                                          <b-form-input v-model="addon_field_item.Pricing[0].expiration_date"   type="date"  />
                                       </b-form-group>
                                    </div>
                                    <div class="col-md-2">
                                       <b-form-group   label="Is waivable">
                                          <b-form-checkbox v-model="addon_field_item.is_waivable"  name="check-button" switch></b-form-checkbox >
                                       </b-form-group>
                                    </div>
                                    <div class="col-md-2">
                                       <b-form-group  label="Is Required">
                                          <b-form-checkbox v-model="addon_field_item.is_required" name="check-button" switch></b-form-checkbox >
                                       </b-form-group>
                                    </div>
                                    <div v-if="addon_field_item.is_waivable==true" class="offset-md-2  col-md-6" >
                                       <b-form-group label="Waive of people at">
                                          <b-form-input v-model="addon_field_item.applicable_on_less_than" type="number" />
                                       </b-form-group>
                                    </div>
                                 </div>
                                 <div class="row">
                                   <div class="col-md-12">
                                       <b-form-group class="pull-right">
                                          <b-button  v-if="addon_field_item.new_addon" style="margin-top:35px;" size="sm" @click="saveAddOns()" class="mb-2 button">Save</b-button>
                                          <b-button  v-else style="margin-top:35px;" size="sm" class="mb-2 button" @click="updateAddons()">Update</b-button>
                                       </b-form-group>
                                    </div>
                                 </div>
                              </b-card>
                           </div>
                        </div>
                        <div class="row" v-if="getAddons.length">
                           <div class="col-md-12" >
                              <a-table v-if="timings.length>0" :columns="addon_options" :dataSource="getAddons">
                                    <span slot="is_waivable" slot-scope="text">{{text}}</span>
                                    <span slot="is_required" slot-scope="text">{{text}}</span>
                                    <span slot="applicable_on_less_than" slot-scope="text">{{text}}</span>
                                    <span slot="Pricing" slot-scope="text">{{text[0].rate}}</span>
                                    <span slot="action" slot-scope="item,index">
                                      <a href="javascript:;" @click="addon_field_item.new_addon=false;addon_field_item=index">Edit</a>
                                    </span>
                              </a-table>
                           </div>
                        </div>
                        <div class="row">
                           <div  class="col-md-12">
                              <!-- @click="saveAddOns()" -->
                              <!-- <b-button  style="margin-left:10px;" size="sm" variant="primary" class="mt-4 pull-right">Save Price</b-button> -->
                           </div>
                        </div>
                     </b-card>
                  </b-card>
               </div>
               <div class="col-md-12">
                  <b-card  class="mb-4" title="Add New Menus" >
                     <div class="row">
                       <div class="col-md-4">
                           <b-card class="mb-4" title="Create New Menu">
                              <div class="row">
                                 <div class="col-md-12">
                                    <b-form-group label="Menu Items">
                                        <multiselect v-model="menu_tags" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                                    </b-form-group>
                                 </div>
                              </div>
                              <div class="row">
                                 <div class="col-md-12">
                                    <b-form-group label="Menu Title"> 
                                        <a-input v-model="menu_title" placeholder="Buffet Storm"/>
                                    </b-form-group>
                                 </div>
                              </div>
                              <div class="row">
                                 <div class="col-md-12">
                                    <b-form-group label="Menu Price"> 
                                        <a-input type="number" v-model="menu_price_pp" placeholder="200"/>
                                    </b-form-group>
                                 </div>
                              </div>
                              <div class="row">
                                 <div class="col-md-12">
                                    <b-form-group label="Effective Date"> 
                                        <a-input  v-model="menu_effective_date" type="date" placeholder="200"/>
                                    </b-form-group>
                                 </div>
                              </div>
                              <div class="row">
                                 <div class="col-md-12">
                                    <b-form-group label="Expiration Date"> 
                                          <a-input  v-model="menu_expiration_date" type="date" placeholder="200"/>
                                    </b-form-group>
                                 </div>
                              </div>
                              <div class="row">
                                 <div  class="col-md-12">
                                    <!-- <b-form-group label="Action"> -->
                                       <b-button  class="mb-2 button pull-right" size="sm" @click="addMenu" >Create</b-button>
                                    <!-- </b-form-group> -->
                                 </div>
                              </div>
                           </b-card>
                        </div>
                        <div v-for="menus in pricings" v-if="menus.product_type=='menu'"  v-bind:key="menus.key" class="col-md-4">
                           <b-card class="mb-4" :title="menus.name">
                              <div class="row">
                                 <div class="col-md-12">
                                    <b-form-group label="Menu Items">
                                        <b-badge variant="info" style="margin-left:5px;" v-for="menu_list_item in menus.list_items" v-bind:key="menu_list_item.key">{{menu_list_item.list_item}}</b-badge>
                                    </b-form-group>
                                 </div>
                              </div>
                              <div class="row">
                                 <div class="col-md-12">
                                    <b-form-group label="Menu Price">
                                        <b-badge variant="success" class="mb-2" style="color:white;" >{{menus.Pricing[0].rate}}</b-badge>
                                    </b-form-group>
                                 </div>
                              </div>
                              <div class="row">
                                <div class="col-md-12">                                
                                  <b-form-group   label="Effective Dates">
                                    <b-form-input v-model="menus.Pricing[0].effective_date" type="date"></b-form-input >
                                  </b-form-group>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-12">                                
                                  <b-form-group   label="Expiration Dates">
                                    <b-form-input v-model="menus.Pricing[0].expiration_date" type="date"></b-form-input >
                                  </b-form-group>
                                </div>
                              </div>
                              <div class="row">
                                 <div  class="col-md-12">
                                    <b-form-group label="Action">
                                       <b-button  class="mb-2 button" size="sm" @click="setSelectedMenu(menus)" >Update</b-button>
                                    </b-form-group>
                                 </div>
                              </div>
                           </b-card>
                        </div>
                        
                        </div>
                  </b-card>
                  </div>
               </div>
            </div>
            <div v-else-if="current === 4">
               <h1 class="heading">Finally</h1>
               <p>Your space has been created successfully</p>
            </div>
         </div>
         <div class="steps-action col-md-12 text-right">
            <button
               class="button"
               v-if="current == steps.length - 1"
               type="primary"
               @click="$message.success('Processing complete!');viewListings()"
               >Done</button>
            <button class="button pull-left" v-if="current>0" style="margin-left: 8px" @click="prev">Previous</button>
            <button
               class="button"
               v-if="current < steps.length - 1"
               type="primary"
               @click="next"
               >{{ current === 0 && isNew ? 'Start' : 'Next'}}</button>
         </div>
         <a-modal @ok="newTiming"
            :width="620"
            title="New Timing"
            v-model="visible">
            <div class="row new-time">
               <div class="col-md-6">
                  <h6 >Opening Time</h6>
               </div>
               <div class="col-md-6">
                  <a-time-picker v-model="newTime.time_start" :minuteStep="15" :secondStep="10"/>
               </div>
            </div>
            <div class="row new-time">
               <div class="col-md-6">
                  <h6>Close time</h6>
               </div>
               <div class="col-md-6">
                  <a-time-picker v-model="newTime.time_end" :minuteStep="15" :secondStep="10"  />
               </div>
            </div>
            <!-- <div class="row new-time">
               <div class="col-md-6">
                  <h6>Date</h6>
               </div>
               <div class="col-md-6">
                  <a-date-picker  />
               </div>
            </div> -->
            <div class="row new-time">
               <div class="col-md-3 .no-pad">
                  <h6>Space Allocation</h6>
               </div>
               <div class="col-md-7 .no-pad">
                  <a-radio-group v-model="newTime.slot" :disabled="timings.length>0">
                     <a-radio-button value="per_day">Per day</a-radio-button>
                     <a-radio-button value="per_shift">Per shift</a-radio-button>
                     <a-radio-button value="per_hour">Per hour</a-radio-button>
                  </a-radio-group>
               </div>
               <div class="col-md-2 no-pad">
                  <a-input-number
                     v-if="newTime.slot === 'per_shift'"
                     :min="2"
                     v-model="newTime.no_of_shift"
                     placeholder="No of Shifts"
                     :max="10"
                     :disabled="timings.length>0"
                     />
               </div>
            </div>
         </a-modal>
         <a-modal @ok="addMenu"
            @cancel="update=false"
            :width="620"
            okText="Save"
            title="New Menu"
            v-model="menu_visible">
            <div class="row new-time">
               <div class="col-md-6">
                  <h6 >Menu Title</h6>
               </div>
               <div class="col-md-6">
                  <a-input v-model="menu_title" placeholder="Buffet Storm"/>
               </div>
             </div>  
            <div class="row new-time">
               <div class="col-md-6">
                  <h6 >Provide Menu Items</h6>
               </div>
               <div class="col-md-6">
                    <multiselect v-model="tags" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
               </div>
            </div>   
            <div class="row new-time">
               <div class="col-md-6">
                  <h6 >Price per Person</h6>
               </div>
               <div class="col-md-6">
                <a-input type="number" v-model="menu_price_pp" placeholder="200"/>
               </div>
            </div>
            <div class="row new-time">
               <div class="col-md-6">
                  <h6 >Effective Date</h6>
               </div>
               <div class="col-md-6">
                <a-input  v-model="menu_effective_date" type="date" placeholder="200"/>
               </div>
            </div>
            <div class="row new-time">
               <div class="col-md-6">
                  <h6>Expiration Date</h6>
               </div>
               <div class="col-md-6">
                <a-input  v-model="menu_expiration_date" type="date" placeholder="200"/>
               </div>
            </div>
         </a-modal>
         
      </div>
   </div>
</template>
<script>
import moment from "moment";
import { RepositoryFactory } from "@/repository/RepositoryFactory";
import { mapGetters,mapState } from "vuex";
import Multiselect from 'vue-multiselect'
const ListingRepository = RepositoryFactory.get("listings");
export default {
  middleware: "auth",
  data() {
    return {
      country:{country:'pk'},
      menu_tags: [],
      options: [],
      addon_field_item:{
        Pricing:[{
          effective_date:null,
          expiration_date:null,
          rate: 0,
          }
        ],
        name: 'default title',
        is_required: false,
        is_waivable: false,
        applicable_on_less_than: 0,
        product_type:'addons',
        new_addon:true
      },
      timing_options : [{
      title: 'Time Start',
      dataIndex: 'time_start',
      scopedSlots: { customRender: 'time_start' },
      }, {
      title: 'Time End',
      dataIndex: 'time_end',
      scopedSlots: { customRender: 'time_end' },

      }, {
      title: 'Slot',
      dataIndex: 'slot',
      scopedSlots: { customRender: 'slot' },

      }, {
      title: 'Action',
      dataIndex: 'timings_conf_id',
      scopedSlots: { customRender: 'timings_conf_id' },
      }],

      addon_options : [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      },
      {
      title: 'Is Waivable',
      scopedSlots: { customRender: 'is_waivable' },
      dataIndex: 'is_waivable',
      key: 'is_waivable',
      },
      {
      title: 'Is Required',
      scopedSlots: { customRender: 'is_required' },
      dataIndex: 'is_required',
      key: 'is_required',
      },
      {
      title: 'Waive Off At',
      scopedSlots: { customRender: 'applicable_on_less_than' },
      dataIndex: 'applicable_on_less_than',
      key: 'applicable_on_less_than',
      },
      {
      title: 'Pricing',
      scopedSlots: { customRender: 'Pricing' },
      dataIndex: 'Pricing',
      key: 'Pricing',
      }, 
      {
      title: 'Action',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' },
      }
      
      ],
      basePriceExists:false,

      pricing_obj: {
        product_type: null,
        name: null,
        description: null,
        is_waivable: false,
        is_required: true,
        applicable_on_less_than: 0,
        entity_id: null,
        list_items_exist: false,
        list_items: [],
        Pricing: []
      },
      base_price:{
        base_rent:null,
        is_waivable:false,
        is_required:false,
        waive_off_at:0,
        effective_date:null,
        expiration_date:null
      },

      update:false,
      menu_title: null,
      menu_price_pp: null,
      menu_pricing_id:null,
      menu_effective_date:null,
      menu_expiration_date:null,
      menu_is_waivable:false,
      menu_is_required:false,
      menu_product_id:0,
      menu_waive_off_at:0,
      tags: [],

      inputVisible: false,
      inputValue: '',
      menuFields: [],
      newTime:{
        slot:'per_hour',
        time_start:null,
        time_end:null,
        hours_per_shift:null,
        no_of_shift:null
      },
      visible: false,
      menu_visible:false,
      isLoading: false,
      timings: [],
      pricings:[],
      steps: [
        {
          title: "About",
          content: "First-content"
        },
        {
          title: "Gallery",
          content: "Second-content"
        },
        {
          title: "Offerings",
          content: "Third-content"
        },
        {
          title: "Pricing",
          content: "Last-content"
        },
        {
          title: "Done",
          content: "Last-content"
        }
      ],
      previewVisible: false,
      previewImage: "",
      featured_image:[],
      fileList: [
      //   {
      //    uid: '-1',
      //   name: 'xxx.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // }
      ],
      current: 0,
      typeOptions: [
        {
          label: "Wedding",
          value: 1
        },
        {
          label: "Party",
          value: 2
        },
        {
          label: "Corporate",
          value: 3
        },
        {
          label: "Sports",
          value: 4
        },
        {
          label: "Production",
          value: 5
        }
      ],
      listing: {
        title: "",
        type_id: null,
        description: "",
        address: null,
        entity_id:null
      },
      permalink: null,
      center: { lat: 30.3753, lng: 69.3451 },
      currentPlace: null,
      customFields: null,
      previous_length:null
    };
  },
  created() {
    this.permalink = this.$route.params.permalink;
    if (this.permalink) {
      this.fetch();
    }
  },
  components:{
    Multiselect
  },
  computed: {
    listing_description_count(){
        return this.listing.description.length;
    },
    titlecharactercount() {
        return this.listing.title.length;
    },
    getAddons() {
      let addons=this.pricings.filter(pricing_item=>pricing_item.product_type=='addons')
      return addons
    },
   ...mapGetters(["user"]),
    isNew() {
      return this.permalink === undefined;
    }
  },
  methods: {
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }

      this.options.push(tag)
      if(this.update){
       this.tags.push(tag) 
      }
      else{
      this.menu_tags.push(tag)

      }
    },
    async newLocation(location) {
      this.currentPlace = {lat:location.latLng.lat(),lng:location.latLng.lng()};
      // const { data } = await ListingRepository.getLocations({lat:location.latLng.lat(),lng:location.latLng.lng()});
      // console.log(data)
      // this.listing.address=data.results[0].formatted_address
    },
    viewListings(){
      this.$router.push({ path: "/myspaces"  });
    },
    async updateBasePrice() {
      
     let activated_timing=this.timings.find(timing_item=>timing_item.is_active==true)
      this.pricing_obj.Pricing = [];
      this.pricing_obj.name = "Base Price";
      this.pricing_obj.product_type = "baseprice";
      this.pricing_obj.entity_id = this.listing.entity_id;
      this.pricing_obj.is_waivable = this.base_price.is_waivable;
      this.pricing_obj.is_required = this.base_price.is_required;
      this.pricing_obj.product_id=this.base_price.product_id
      this.pricing_obj.applicable_on_less_than = this.base_price.waive_off_at;

      let temp_price_obj = {
        hours:1,
        effective_date:this.base_price.expiration_date.replace(/-/g, "/"),
        expiration_date:this.base_price.expiration_date.replace(/-/g, "/"),
        monday:this.base_price.base_rent,
        tuesday:this.base_price.base_rent,
        wednesday:this.base_price.base_rent,
        thursday:this.base_price.base_rent,
        product_id:this.base_price.product_id,
        pricing_id:this.base_price.pricing_id,
        friday:this.base_price.base_rent,
        saturday:this.base_price.base_rent,
        sunday:this.base_price.base_rent,
        rate:this.base_price.base_rent,
        rate_calculation:activated_timing.slot
      };
      this.pricing_obj.Pricing.push(temp_price_obj);

     let { data } = await ListingRepository.update_pricing(this.pricing_obj);
      if (data.success == true) {
          // this.openNotificationWithIcon('success',data.user_message)
      } else {
          this.openNotificationWithIcon('error',data.user_message)
      }

    },
    setSelectedMenu (menu) {
      this.options=[]
      this.tags=[]
      this.update=true
      this.menu_visible=true
      this.menu_title=menu.name
      this.menu_price_pp=menu.Pricing[0].rate
      this.menu_effective_date=menu.Pricing[0].effective_date
      this.menu_expiration_date=menu.Pricing[0].expiration_date
      this.menu_product_id=menu.product_id
      this.menu_pricing_id=menu.Pricing[0].pricing_id

      menu.list_items.forEach(item=>{
      this.tags.push({name: item.list_item,code: item.list_item.substring(0, 2) + Math.floor((Math.random() * 10000000))})
      })
    },
    fillAddOnFields(title, price, waiveoffat) {
      this.addon_field_item={
        Pricing:[{
          effective_date:null,
          expiration_date:null,
          rate: price,
          }
        ],
        name: title,
        is_required: false,
        is_waivable: false,
        applicable_on_less_than: waiveoffat,
        product_type:'addons',
        new_addon:true
      };
    },
    async activateSlots (config_id) {
       const { data } = await ListingRepository.changeTimeSlots({config_id:config_id,entity_id:this.listing.entity_id});
       this.fetch()
    },
    async newTiming() {
        if (this.newTime.slot == "per_hour") {
          this.newTime.hours_per_shift = 1;
        }
        else if (this.newTime.slot == "per_day") {
        var res = moment(this.newTime.time_start).format("HH:mm:ss").split(":",2)//this.open_time_hour.split(":",2);
        var start_hour=res[0]
        var res = moment(this.newTime.time_end).format("HH:mm:ss").split(":",2)//this.close_time_hour.split(":",2);
        var end_hour=res[0]
        var workinghours=end_hour-start_hour
        this.newTime.hours_per_shift = workinghours
        } 
        else if (this.newTime.slot == "per_shift") {
          var res = moment(this.newTime.time_start).format("HH:mm:ss").split(":",2)//this.open_time_hour.split(":",2);
          var start_hour=res[0]
          var res = moment(this.newTime.time_end).format("HH:mm:ss").split(":",2)//this.close_time_hour.split(":",2);
          var end_hour=res[0]
          var workinghours=end_hour-start_hour
          var totalshifts=this.newTime.no_of_shift
          this.newTime.hours_per_shift = workinghours/totalshifts;
        }
        let obj={time_start:moment(this.newTime.time_start).format("HH:mm:ss")+'.00',
        time_end:moment(this.newTime.time_end).format("HH:mm:ss")+'.00',
        slot:this.newTime.slot,
        hours_per_shift:this.newTime.hours_per_shift,
        entity_id:this.listing.entity_id}
        console.log(obj)
        const { data } = await ListingRepository.createTimeSlots(obj);
        if(data.success){
        // this.openNotificationWithIcon('success',data.user_message)
        this.fetch();

        }
        else{
        // this.openNotificationWithIcon('error',data.user_message)
        this.openNotificationWithIcon('success','slots created succesfully')
        this.fetch();

        }
        this.hideModal()


    },
    showModal() {
      this.visible = true
    },
    hideModal(){
      this.visible = false
    },
    handleOk(e) {
      this.visible = false
    },
    openNotificationWithIcon (type,message) {
      this.$notification[type]({
        message: type,
        description: message,
      });
    },
    async fetch() {
      this.isLoading = true;
      const { data } = await ListingRepository.get(this.permalink);
      this.timings=data.Entity.timings_conf
      this.listing.title = data.Entity.name;
      this.listing.description = data.Entity.description;
      this.listing.address = data.Entity.address;
      this.listing.type_id = data.Entity.type_id;
      this.listing.entity_id=data.Entity.entity_id
      this.currentPlace = {
        lat: data.Entity.latitude,
        lng: data.Entity.longitude
      };
      this.center = this.currentPlace;
      this.fileList = data.Entity.images.map((image, i) => ({
        uid: i,
        name: image,
        status: "done",
        url: image
      }));
      this.featured_image[0] = {
        uid: 0,
        name: "space",
        status: "done",
        url: data.Entity.featured_image
      };
      this.previous_length=data.Entity.images.length
      this.customFields = data.CustomFields;
      if(this.timings.length>0){
        this.newTime.slot=this.timings[0].slot
        if(this.newTime.slot=='per_shift') this.newTime.no_of_shift=this.timings[0].hours_per_shift
      }
      for(var i=0;i<this.timings.length;i++){
        this.timings[i].time_start=moment(this.timings[i].time_start,'HH:mm:ss')
        this.timings[i].time_end=moment(this.timings[i].time_end,'HH:mm:ss')

      }
      this.fetchPricings()
      this.isLoading = false;
    },
    async saveBasePrice () {

     let activated_timing=this.timings.find(timing_item=>timing_item.is_active==true)
      this.pricing_obj.Pricing = [];
      this.pricing_obj.name = "Base Price";
      this.pricing_obj.product_type = "baseprice";
      this.pricing_obj.entity_id = this.listing.entity_id;
      this.pricing_obj.is_waivable = this.base_price.is_waivable;
      this.pricing_obj.is_required = this.base_price.is_required;
      this.pricing_obj.applicable_on_less_than = this.base_price.waive_off_at;

      let temp_price_obj = {
        hours:1,
        effective_date:this.base_price.expiration_date.replace(/-/g, "/"),
        expiration_date:this.base_price.expiration_date.replace(/-/g, "/"),
        monday:this.base_price.base_rent,
        tuesday:this.base_price.base_rent,
        wednesday:this.base_price.base_rent,
        thursday:this.base_price.base_rent,
        friday:this.base_price.base_rent,
        saturday:this.base_price.base_rent,
        sunday:this.base_price.base_rent,
        rate:this.base_price.base_rent,
        rate_calculation:activated_timing.slot
      };
      this.pricing_obj.Pricing.push(temp_price_obj);

      let { data } = await ListingRepository.add_new_pricing(this.pricing_obj);
      if (data.success == true) {
          // this.openNotificationWithIcon('success',data.user_message)
          this.fetchPricings()
      } else {
          this.openNotificationWithIcon('error',data.user_message)
      }

    },
    async updateAddons () {
      let activated_timing=this.timings.find(timing_item=>timing_item.is_active==true)
      this.pricing_obj.Pricing = [];
      this.pricing_obj.name = this.addon_field_item.name;
      this.pricing_obj.product_type = "addons";
      this.pricing_obj.entity_id = this.listing.entity_id;
      this.pricing_obj.is_waivable = this.addon_field_item.is_waivable;
      this.pricing_obj.is_required = this.addon_field_item.is_required;
      this.pricing_obj.applicable_on_less_than = this.addon_field_item.applicable_on_less_than;
      this.pricing_obj.product_id=this.addon_field_item.product_id

      let temp_price_obj = {
        hours:1,
        effective_date:this.addon_field_item.Pricing[0].effective_date.replace(/-/g, "/"),
        expiration_date:this.addon_field_item.Pricing[0].expiration_date.replace(/-/g, "/"),
        monday:this.addon_field_item.Pricing[0].rate,
        tuesday:this.addon_field_item.Pricing[0].rate,
        wednesday:this.addon_field_item.Pricing[0].rate,
        thursday:this.addon_field_item.Pricing[0].rate,
        friday:this.addon_field_item.Pricing[0].rate,
        pricing_id:this.addon_field_item.Pricing[0].pricing_id,
        product_id:this.addon_field_item.product_id,
        saturday:this.addon_field_item.Pricing[0].rate,
        sunday:this.addon_field_item.Pricing[0].rate,
        rate:this.addon_field_item.Pricing[0].rate,
        rate_calculation:activated_timing.slot
      };
      this.pricing_obj.Pricing.push(temp_price_obj);
      // console.log(this.pricing_obj)
      let { data } = await ListingRepository.update_pricing(this.pricing_obj);
      if (data.success == true) {
          // this.openNotificationWithIcon('success',data.user_message)
          this.fetchPricings()
      } else {
          this.openNotificationWithIcon('error',data.user_message)
      }

    },
    async saveAddOns () {  
     let activated_timing=this.timings.find(timing_item=>timing_item.is_active==true)
      this.pricing_obj.Pricing = [];
      this.pricing_obj.name = this.addon_field_item.name;
      this.pricing_obj.product_type = "addons";
      this.pricing_obj.entity_id = this.listing.entity_id;
      this.pricing_obj.is_waivable = this.addon_field_item.is_waivable;
      this.pricing_obj.is_required = this.addon_field_item.is_required;
      this.pricing_obj.applicable_on_less_than = this.addon_field_item.applicable_on_less_than;

      let temp_price_obj = {
        hours:1,
        effective_date:this.addon_field_item.Pricing[0].effective_date.replace(/-/g, "/"),
        expiration_date:this.addon_field_item.Pricing[0].expiration_date.replace(/-/g, "/"),
        monday:this.addon_field_item.Pricing[0].rate,
        tuesday:this.addon_field_item.Pricing[0].rate,
        wednesday:this.addon_field_item.Pricing[0].rate,
        thursday:this.addon_field_item.Pricing[0].rate,
        friday:this.addon_field_item.Pricing[0].rate,
        saturday:this.addon_field_item.Pricing[0].rate,
        sunday:this.addon_field_item.Pricing[0].rate,
        rate:this.addon_field_item.Pricing[0].rate,
        rate_calculation:activated_timing.slot
      };
      this.pricing_obj.Pricing.push(temp_price_obj);
      let { data } = await ListingRepository.add_new_pricing(this.pricing_obj);
      if (data.success == true) {
          // this.openNotificationWithIcon('success',data.user_message)
          this.fetchPricings()
          this.fillAddOnFields('Demo',null,0)
      } else {
          this.openNotificationWithIcon('error',data.user_message)
      }

    },
    async addMenu() {
      let activated_timing=this.timings.find(timing_item=>timing_item.is_active==true)
      this.pricing_obj.Pricing = [];
      this.pricing_obj.name = this.menu_title;
      this.pricing_obj.product_type = "menu";
      this.pricing_obj.entity_id = this.listing.entity_id;
      this.pricing_obj.list_items=[]
      this.pricing_obj.list_items_exist=true
      this.pricing_obj.is_waivable = this.menu_is_waivable;
      this.pricing_obj.is_required = this.menu_is_required;
      this.pricing_obj.applicable_on_less_than = this.menu_waive_off_at;

      let temp_price_obj = {
        hours:1,
        effective_date:this.menu_effective_date.replace(/-/g, "/"),
        expiration_date:this.menu_expiration_date.replace(/-/g, "/"),
        monday:this.menu_price_pp,
        tuesday:this.menu_price_pp,
        wednesday:this.menu_price_pp,
        thursday:this.menu_price_pp,
        friday:this.menu_price_pp,
        saturday:this.menu_price_pp,
        sunday:this.menu_price_pp,
        rate:this.menu_price_pp,
        rate_calculation:activated_timing.slot
      };
      this.pricing_obj.Pricing.push(temp_price_obj);
      if(this.update){
          for (let men_tag of this.tags) {
            this.pricing_obj.list_items.push({ list_item: men_tag.name });
          }
        this.pricing_obj.Pricing[0].pricing_id=this.menu_pricing_id,
        this.pricing_obj.Pricing[0].product_id=this.menu_product_id,
        this.pricing_obj.product_id=this.menu_product_id
        let { data } = await ListingRepository.update_pricing(this.pricing_obj);
            if (data.success == true) {
                // this.openNotificationWithIcon('success',data.user_message)
                this.fetchPricings()
                this.menu_visible=false
            } else {
                this.openNotificationWithIcon('error',data.user_message)
                this.menu_visible=false
            }
      }
      else{
          for (let men_tag of this.menu_tags) {
          this.pricing_obj.list_items.push({ list_item: men_tag.name });
          }
          let { data } = await ListingRepository.add_new_pricing(this.pricing_obj);
            if (data.success == true) {
                // this.openNotificationWithIcon('success',data.user_message)
                this.fetchPricings()
                this.menu_visible=false
            } else {
                this.openNotificationWithIcon('error',data.user_message)
                this.menu_visible=false
            }
      }
      this.update=false
      this.menu_title = null;
      this.tags = [];
      this.menu_tags=[]
      this.menu_effective_date=null,
      this.menu_expiration_date=null;
      this.menu_price_pp = null;
    },
    async getCusotmFields() {
      // this.isLoading = true;
      const { data } = await ListingRepository.getCustomFields(
        this.listing.type_id
      );
      this.isLoading = false;
      this.customFields = data;
    },
    async fetchPricings() {
      const { data } = await ListingRepository.get_entity_pricings(this.listing.entity_id)
      this.pricings=data
      if(this.pricings){
        for(var i=0;i<this.pricings.length;i++){
          if(this.pricings[i].Pricing.length>0){
            let eff_date=this.pricings[i].Pricing[0].effective_date.split('/')
            this.pricings[i].Pricing[0].effective_date=eff_date[0]+'-'+eff_date[1]+'-'+eff_date[2]
            let exp_date=this.pricings[i].Pricing[0].expiration_date.split('/')
            this.pricings[i].Pricing[0].expiration_date=exp_date[0]+'-'+exp_date[1]+'-'+exp_date[2]
          }
        }
      }
      const base_price=this.pricings.find(pricing_item=>pricing_item.product_type=='baseprice')
      if(base_price){
        this.basePriceExists=true

        let new_eff_Date=base_price.Pricing[0].effective_date.split('T')
        let new_exp_Date=base_price.Pricing[0].expiration_date.split('T')

        this.base_price.base_rent=base_price.Pricing[0].rate
        this.base_price.effective_date=new_eff_Date[0]
        this.base_price.expiration_date=new_exp_Date[0]
        this.base_price.pricing_id=base_price.Pricing[0].pricing_id

        // this.base_price.effective_date=new_eff_Date[0]+'-'+new_eff_Date[1]+'-'+new_eff_Date[2]
        // this.base_price.expiration_date=new_exp_Date[0]+'-'+new_exp_Date[1]+'-'+new_exp_Date[2]
        this.base_price.is_waivable=base_price.is_waivable
        this.base_price.is_required=base_price.is_required
        this.base_price.waive_off_at=base_price.applicable_on_less_than
        this.base_price.product_id=base_price.product_id
      }
      else{
        this.basePriceExists=false
      }

      
    },
    isAboutValid() {
      return (
        this.listing.type_id !== null &&
        this.listing.title.length > 10 &&  
        this.listing.description.length > 50 &&
        this.listing.address !== null
      );
    },
    async startListing() {
      if(this.listing.type_id === null){
        this.openNotificationWithIcon('error',"Space type  should be selected")
      }
      else if(this.listing.title.length < 10){
        this.openNotificationWithIcon('error',"Space title should be equal to 11 characters")
      }
      else if(this.listing.description.length < 50){
        this.openNotificationWithIcon('error',"Description should be 50 characters long")
      }
      else if(this.listing.address === null){
        this.openNotificationWithIcon('error',"Provide space Location")
      }
      else {
        this.isLoading=true;
        let obj = {
          name:this.listing.title,
          company_id:this.user.company_id,
          address:this.listing.address,
          description:this.listing.description,
          type_id:this.listing.type_id,
          longitude:this.center.lng,
          latitude:this.center.lat}
        const { data } = await ListingRepository.newListing({Entity:obj});
        this.isLoading=false
        this.listing.entity_id=data.entity_id
        this.permalink=data.permalink
        if(data.success) {
          //  this.openNotificationWithIcon('success',data.user_message)
           this.current++
        }
        else {
           this.openNotificationWithIcon('error',data.user_message)
        }
      }
    },
    handleChange ({ fileList }) {
      this.fileList = fileList
    },
    handleNewChange (info) {
      // console.log("dsa")
      // console.log(fileList)
      let fileList = [...info.fileList];

      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-1);

      // 2. read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });

      this.featured_image = fileList
    },
    async handleUpload() {
      this.isLoading=true
      if(this.previous_length<this.fileList.length){
        if(this.previous_length==null) this.previous_length=0
        let temp_arr=[]
        let featured=[]

        for(var i=this.previous_length;i<this.fileList.length;i++) {
          temp_arr.push(this.fileList[i].originFileObj)
        }
        console.log(this.featured_image.length)
        for(var i=0;i<this.featured_image.length;i++) {
          featured.push(this.featured_image[i].originFileObj)
        }
        
        let img_obj={}
        this.$set(img_obj, "files", temp_arr);
        this.$set(img_obj, "entity_id", this.listing.entity_id);
        this.$set(img_obj, "file_type", "images");
        this.$set(img_obj, "featured_image", featured);
        // this.$set(img_obj, "featured_image", "images");

        let { data } = await ListingRepository.uploadEntityGalleryImages(img_obj);
        if(data.success) {
          // this.openNotificationWithIcon('success',data.user_message)
          this.current++;
        }
        else {
          this.openNotificationWithIcon('error',data.user_message)
        }

      }
      else {
          this.current++;
      }
        this.isLoading=false
      

    },
    async updateCustomFields () {
      this.isLoading=true
      let obj = {
          name:this.listing.title,
          company_id:this.user.company_id,
          address:this.listing.address,
          description:this.listing.description,
          type_id:this.listing.type_id,
          longitude:this.center.lng,
          permalink:this.permalink,
          latitude:this.center.lat}
          let { data } = await ListingRepository.update_entity({Entity:obj,CustomFields:this.customFields});
          if(data.success) {
          //  this.openNotificationWithIcon('success',data.user_message)
            this.current++;
          }
      this.isLoading=false

    },
    async updateAbout() {
      
      if(this.listing.type_id === null){
        this.openNotificationWithIcon('error',"Space type  should be selected")
      }
      else if(this.listing.title.length < 10){
        this.openNotificationWithIcon('error',"Space title should be equal to 11 characters")
      }
      else if(this.listing.description.length < 50){
        this.openNotificationWithIcon('error',"Description should be 50 characters long")
      }
      else if(this.listing.address === null){
        this.openNotificationWithIcon('error',"Provide space Location")
      }
      else {
        this.isLoading=true
        let obj = {
          name:this.listing.title,
          company_id:this.user.company_id,
          address:this.listing.address,
          description:this.listing.description,
          type_id:this.listing.type_id,
          longitude:this.center.lng,
          latitude:this.center.lat,
          permalink:this.permalink
          }
        const { data } = await ListingRepository.updateListing({Entity:obj})
        if(data.success){
          //  this.openNotificationWithIcon('success',data.user_message)
           this.current++
        }
        else {
           this.openNotificationWithIcon('error',data.user_message)
        }
        this.isLoading=false
      }
    },
    next() {
        if (this.isNew) {
          if(this.current==0){
          this.startListing();
          }
          else if(this.current==1) {
            this.handleUpload()
          }            
        }
        else{
          if(this.current==0) {
           this.updateAbout();
          }
          else if(this.current==1) {
            this.handleUpload()
          }
          else if(this.current==2) {
            this.updateCustomFields()
          }
          else if(this.current==3){
            this.current++

          }
        } 
    },
    updateCoordinates (location) {
      this.center = {
          lat: location.latLng.lat(),
          lng: location.latLng.lng()
        };

      this.currentPlace = {lat:location.latLng.lat(),lng:location.latLng.lng()};
    },
    async updateCoordinatesEnd (location) {
      this.center = {
          lat: location.latLng.lat(),
          lng: location.latLng.lng()
      };

      this.currentPlace = {lat:location.latLng.lat(),lng:location.latLng.lng()};  
      // const { data } = await ListingRepository.getLocations({lat:location.latLng.lat(),lng:location.latLng.lng()});
      // this.listing.address=data.results[0].formatted_address
    },
    prev() {
      this.current--;
    },
    setPlace(place) {      
      this.currentPlace = {lat:place.geometry.location.lat(),lng:place.geometry.location.lng()};
      this.center.lat=place.geometry.location.lat()
      this.center.lng=place.geometry.location.lng()
      this.listing.address=place.formatted_address
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.currentPlace = {lat:position.coords.latitude,lng:position.coords.longitude};

      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    }
  },
  mounted() {
    this.geolocate();
  }
};
</script>

<style scoped>
.heading {
  font-weight: 600;
  font-size: 24px;
}
.second-heading {
  font-weight: 500;
  font-size: 14px;
}
.form-control:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.input-element {
  font-weight: 500;
  font-size: 18px;
  background: none;
  border: none;
  border-bottom: 1px solid gray;
  border-radius: 0px;
  text-align: center;
}
.steps-content {
  margin-top: 16px;
  min-height: 200px;
  text-align: left;
  padding-top: 20px;
}

.steps-action {
  margin-top: 24px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.new-time{
  margin-top:10px;
}

.no-pad{
  padding-right:0;
  padding-left:0;
}
</style>
