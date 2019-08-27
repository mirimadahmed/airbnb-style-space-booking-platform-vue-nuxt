<template>
    <div>
        <input type="file" @change="onFilePicked" style="display:none;" ref="FileInput">
        <div class="text-center mt-3" v-if="isLoading">
        <a-spin />
        </div>
        <div v-else class="row mx-5">
            <div class="offset-md-4 col-md-4 mt-3">
                <b-card
                    title="Users Profile"
                    img-alt="Image"
                    img-top
                    tag="article"
                    class="mb-2">
                    <img v-if="currentUser.logo_image==null" src="/default-profile.png" @click="onPickFile" alt="Card image cap" class="img-thumbnail list-thumbnail rounded-circle border-0 mb-4" />
                    <img v-else-if="temp_file!=null" :src="temp_file" style="width:100px;" @click="onPickFile" alt="Card image cap" class="img-thumbnail list-thumbnail rounded-circle border-0 mb-4" />                    
                    <img v-else :src="currentUser.logo_image" style="width:100px;" @click="onPickFile" alt="Card image cap" class="img-thumbnail list-thumbnail rounded-circle border-0 mb-4" />
                    <b-card-body>
                        <b-form>
                            <b-form-group
                                id="input-group-1"
                                label="Contact Number"
                                label-for="input-1">
                                <b-form-input
                                id="input-1"
                                type="number"
                                required
                                v-model="currentUser.phone_no"
                                placeholder="023058597460"
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group id="input-group-2" label="Company Address" label-for="input-2">
                                <b-form-textarea
                                placeholder="Street 6,H9,Islamabad"
                                rows="3"
                                v-model="currentUser.address"
                                max-rows="6"
                                ></b-form-textarea>
                            </b-form-group>
                        <button class="pull-right" @click.prevent="updateProfile">Confirm</button>
                    </b-form>
                    </b-card-body>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
import { RepositoryFactory } from "@/repository/RepositoryFactory";
const UserRepository = RepositoryFactory.get("user");
import {mapGetters} from 'vuex'
export default {
    methods:{
        async updateProfile () {
        this.isLoading = true
        var {data}= await UserRepository.updateVendorProfile(this.currentUser)
        console.log(data)
        this.openNotificationWithIcon('success',data.user_message)
        this.isLoading = false
        },       
        async fetchPermaLinks() {
        const { data } = await UserRepository.getCompanyProfile(this.user.permalink)
        this.currentUser=data
        console.log(data)
        //   this.$store.commit('setCompanyProfile', data)
        this.isLoading = false
        },
        onPickFile() { 
        this.$refs.FileInput.click();
        },
        onFilePicked(event) { 
        console.log(event.target.files[0])
        var ref=this 
        this.currentUser.logo_image=event.target.files[0] 
        var fileReader = new FileReader();
        let base64=''
        fileReader.onload = function(fileLoadedEvent) {
                  base64 = fileLoadedEvent.target.result;
                  ref.pushbasestring(base64)
              };
        fileReader.readAsDataURL(event.target.files[0]);
        },
        openNotificationWithIcon (type,message) {
            this.$notification[type]({
                message: 'Notification',
                description: message,
            });
        },
        async pushbasestring(base64) {
        this.temp_file=base64
        }
    },
    computed: {
        ...mapGetters(["user"])
    },
    data(){
        return{
            file:'./assets/img/default-profile.png',
            isLoading:true,
            currentUser:{},
            temp_file:null
        }
    },
    created () {
        this.fetchPermaLinks()
    }
}
</script>

