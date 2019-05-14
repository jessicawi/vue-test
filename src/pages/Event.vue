<template>
    <div id="event_Calendar">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <!--<b-btn v-b-modal.create_event_modal variant="primary" class="btnCreateEvent">-->
                <!--Create Event-->
            <!--</b-btn>-->
            <b-btn variant="primary" class="btnCreateEvent" v-on:click="eventNewEdit('New')">
                Create Event
            </b-btn>
        </div>

        <b-modal id="create_event_modal" size="xl" title='Event' ref="EventShowModal" ok-only
                 ok-variant="secondary">

                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12" title="Event Type">

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>{{ lblNewEditCalendar }} Event</label> <br>
                    <label><h1>Calendar Title</h1></label>
                    <input type="text" class="form-control" v-model="inputEventTitle">
                    <b-form-group label="Event Type" align="left">
                        <b-form-radio v-model="rdEventType" name="some-radios" value="Event" checked>Event</b-form-radio>
                        <b-form-radio v-model="rdEventType" name="some-radios" value="SchoolClosure">School Closure</b-form-radio>
                        <b-form-radio v-model="rdEventType" name="some-radios" value="PublicHoliday">Public Holiday</b-form-radio>
                        <!--<span align="left">Picked: {{ rdEventType }}</span>-->
                    </b-form-group>
                </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label><b>Participant Email</b></label>
                        <textarea v-model="textareaParticipantEmail" placeholder="Participant Email" class="fullwidth"></textarea>
                    </div>

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <label>From
                                <el-date-picker v-model="inputEventStartTime" format="dd-MM-yyyy HH:mm:ss"
                                                value-format="dd-MM-yyyy HH:mm:ss" type="datetime"
                                                class="form-control"
                                                placeholder="Pick a day"></el-date-picker></label>

                                <label> To
                                <el-date-picker v-model="inputEventEndTime" format="dd-MM-yyyy HH:mm:ss"
                                                value-format="dd-MM-yyyy HH:mm:ss" type="datetime"
                                                class="form-control"
                                                placeholder="Pick a day"></el-date-picker></label>
                        <br>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <b-form-checkbox
                            v-model="optFullDayEvent" name="check-button" switch>Full Day event?
                            {{optFullDayEvent}}
                        </b-form-checkbox>
                        <b-form-checkbox
                                v-model="optParentSignUp" name="btnParentSignUp" switch>Parent sign up?
                            {{optParentSignUp}}
                        </b-form-checkbox>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Registration Limit</label>
                        <b-form-input id="RegLimit"
                                      type="text" class="form-control" v-model="inputEventRegLimit" value="0" min="0" max="99"></b-form-input>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Registration cutoff(days)</label>
                        <b-form-input id="range-1" v-model="inputEventRegCutOffDay" type="range" value="0" min="0" max="5" step="1"></b-form-input>
                        <div class="mt-2">Days: {{ inputEventRegCutOffDay }}</div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <el-select v-model="ddlClassLevel" placeholder="Select" class="fullwidth">
                            <el-option
                                    v-for="item in levelList"
                                    :key="item.PK_Course_ID"
                                    :label="item.CRS_Course_Name"
                                    :value="item.PK_Course_ID">
                            </el-option>
                        </el-select>
                        <button v-on:click="btnAddClasses()">Add Classes</button>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Location</label>
                        <input type="text" class="form-control" v-model="inputEventLocation">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <el-select v-model="ddlParticipant" placeholder="Select" class="fullwidth">
                            <el-option v-for="item in ParticipantList"
                                       :value="item.CONid"
                                       :label="item.CONname"
                                       :key="item.CONid">
                            </el-option>
                        </el-select>
                        <button v-on:click="AddParticipantList()">Add Participant</button>
                    </div>

                </div>

            <div v-if="this.lblNewEditCalendar==='New'">
                <button v-on:click="btnCreateEvent()">Create Event</button>
            </div>

            <div v-else>
                <button v-on:click="btnEditEvent()">Edit Event</button>
            </div>

        </b-modal>

        <div class="container">
            <div>
                <h1>Event Overview</h1>
            </div>
            <div class="row">
                <div class="col-lg">
                    <h5>Event Details</h5>
                    <div style="overflow-x:scroll; height:800px;background:whitesmoke;scrollbar-color:rebeccapurple green">
                        <ul>
                            <li v-for="item in eventList" v-bind:key="item.EventID" ref="">
                                {{item.EventTitle}}<br>
                                {{convertToDate(item.EventStartTime)}}<br>
                                {{getEventTime(item.EventStartTime,item.EventEndTime)}}<br>
                                {{item.EventLocation}}<br>
                                <b>Created By:{{item.CONname}}</b><br>
                                <b-btn v-if="item.EventCreatedBy === sessionID" @click="editEvent(item.EventID)">Edit</b-btn>
                                <hr>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="col-sm">
                    <h5>Upcoming Event</h5>
                </div>

                <div class="col-sm">
                    <h5>Calender</h5>
                    <div>
                        <v-calendar title-position="right" v-model="inputVCalendar"></v-calendar>
                        <v-date-picker :mode='mode' v-model='selectedDate'/>
                        <button v-on:click="btnAddToCalendar()">Add to calendar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import Cookies from "js-cookie";
    import Vue from 'vue';
    import VCalendar from "v-calendar";

    Vue.use(VCalendar, {
        componentPrefix: 'v',  // Use <vc-calendar /> instead of <v-calendar />
        // ...,                // ...other defaults
    });
    export default {
        name: "Event",
        components: {
            // VCalendar,
        },
        async mounted() {
            await this.LoadEventDetails();
            await this.BindParticipantList();
            await this.getLevelSpecificSchool();

            this.sessionID = Cookies.get('userIDSession');
        },
        data(){
            return{
                ddlParticipant:'',
                selectedParticipantList:[],
                textareaParticipantEmail:'',
                rdEventType: 'Event',
                eventList:[],
                levelList: [],
                ParticipantList:[],
                inputEventStartTime:'',
                inputEventEndTime:'',
                optFullDayEvent:false,
                optParentSignUp:false,
                inputEventRegCutOffDay:'0',
                inputEventRegLimit:'0',
                inputEventTitle:'',
                inputEventLocation:'',
                inputEventDesc:'',
                ddlClassLevel: '',
                //v-calendar
                inputVCalendar:'',
                mode:'single',
                selectedDate:null,
                sessionID: '',
                lblNewEditCalendar: '',
            }
        },
        methods:{
            async BindEventFields(resultTable){
                try {
                    resultTable.forEach(m => {
                        this.inputEventTitle = m.EventTitle;
                        this.rdEventType = m.EventType;
                        this.inputEventStartTime = m.EventStartTime;
                        this.inputEventEndTime = m.EventEndTime;
                        this.inputEventRegLimit = m.EventRegLimit;
                        this.inputEventRegCutOffDay = m.EventRegCutOffDay;
                        this.inputEventLocation = m.EventLocation;

                        if (m.EventFullDay === 'Yes') {
                            this.optFullDayEvent = true;
                        };
                        if (m.EventParentSignUp === 'Yes') {
                            this.optParentSignUp = true;
                        };
                    });
                } catch (e) {
                    this.results = e;
                }
            },
            async editEvent(eventID){
                try{
                    const response = await DataSource.shared.getEvent(eventID);
                    if(response==='88') {
                        window.location.replace('/');
                    }else if(response==='99'){
                        console.log('Cannot get event');
                    }else if(response==='2'){
                        console.log('invalid ID');
                        window.location.replace('/');
                    }
                    else{
                        this.BindEventFields(response.Table);
                        this.$refs['EventShowModal'].show();
                        console.log(eventID);
                    }

                    this.eventNewEdit('Edit');

                }catch(e){
                    alert(e);
                    console.log(e);
                }

            },
            AddParticipantList(){
                console.log(this.selectedParticipantList);
                console.log(JSON.stringify(this.selectedParticipantList));
                try{
                    if (this.ddlParticipant !== '') {
                        let addNewRowList = {
                            participantID: this.ddlParticipant,
                        };
                        this.selectedParticipantList.push(addNewRowList);
                    } else {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please select'
                        });
                    }
                }
                catch(e){
                    alert(e);
                    console.log(e);
                }
            },
            async getLevelSpecificSchool() {
                try {
                   console.log(Cookies.get('schoolSession')) ;
                    const response = await DataSource.shared.getLevelSpecificSchool(Cookies.get('schoolSession'));
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.levelList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindParticipantList(){
                try {
                    const response = await DataSource.shared.getAllStaffListBySchool();
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.participantListResponse = response.Table;
                            this.participantListResponse.forEach(m => {
                                this.ParticipantList.push(m);
                            });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            getEventTime(startValue,endValue){
                try{
                    let startTime = new Date(startValue);
                    let endTime = new Date(endValue);
                    let timeDiff = Math.abs(endTime.getTime()-startTime.getTime());
                    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    let starthour = new Date(startValue).getHours();
                    let startminute = new Date(startValue).getMinutes();
                    let endhour = new Date(endValue).getHours();
                    let endminute = new Date(endValue).getMinutes();
                    let Time;
                    if(diffDays>1)
                    {
                        return "All Day";
                    }
                    else{
                        Time = starthour + ":"+startminute+ "AM to " +endhour+":"+endminute+"PM";
                        return Time;
                    }
                }catch(e){
                    alert(e);
                }
            },
            convertToDate(startTime){
                let day = new Date(startTime).getDate();
                let month = new Date(startTime).getMonth() + 1;
                let year = new Date(startTime).getFullYear();
                let date;

                let monthValue = new Array();
                monthValue[0] = "January";
                monthValue[1] = "February";
                monthValue[2] = "March";
                monthValue[3] = "April";
                monthValue[4] = "May";
                monthValue[5] = "June";
                monthValue[6] = "July";
                monthValue[7] = "August";
                monthValue[8] = "September";
                monthValue[9] = "October";
                monthValue[10] = "November";
                monthValue[11] = "December";

                let m = monthValue[month-1];
                date = day + "th " + m + " " + year;
                return date;
            },
            async btnCreateEvent(){

                try
                {
                    if(this.optFullDayEvent===true){
                        this.optFullDayEvent="Yes";
                    }
                    else{
                        this.optFullDayEvent="No";
                    }
                    if(this.optParentSignUp===true){
                        this.optParentSignUp = "Yes";
                    }
                    else{
                        this.optParentSignUp = "No";
                    }

                    let participantList=[];
                    var Obj = {
                        EventTitle:this.inputEventTitle,
                        EventType:this.rdEventType,
                        EventStartTime:this.inputEventStartTime,
                        EventEndTime:this.inputEventEndTime,
                        EventFullDay:this.optFullDayEvent,
                        EventParentSignUp: this.optParentSignUp,
                        EventRegCutOffDay:this.inputEventRegCutOffDay,
                        EventRegLimit:this.inputEventRegLimit,
                        EventLocation: this.inputEventLocation,
                        // EventDesc:this:inputEventDesc
                    };

                    if(this.selectedParticipantList!==''|| this.selectedParticipantList !== null || this.selectedParticipantList !==undefined){
                        this.selectedParticipantList.forEach(item => {
                            let participantListDetail = {
                                Type: 'EventParConID',
                                value: item.participantID,
                            };
                            participantList.push(participantListDetail);
                            console.log(JSON.stringify(participantList));
                        });
                    }

                    if(this.inputEventTitle=== '' || this.inputEventTitle === null || this.inputEventTitle === undefined){
                        alert('Please insert event title.');
                    }
                    else if(this.inputEventStartTime === '' || this.inputEventStartTime === null || this.inputEventStartTime === undefined){
                        alert('Please select date from.');
                    }
                    else if(this.inputEventEndTime === '' || this.inputEventEndTime === null || this.inputEventEndTime === undefined){
                        alert('Please select date to');
                    }
                    else{

                        const response = await DataSource.shared.saveEvent(JSON.stringify(Obj),JSON.stringify(participantList));

                        if(response.code==='88'){
                            console.log('88');
                        }
                        else if(response.code==="99"){
                            console.log('99');
                        }
                        else if(response.code==='1'){
                            alert('Event added Successful');
                            window.location.replace('/Event');
                        }
                    }
                }
                catch(e){
                    alert(e);
                }
            },
            async btnAddToCalendar(){

            },
            LoadEventDetails() {
                try{
                    const response = DataSource.shared.getEvent();
                    response.then((response)=>{

                        if(response.Table.length < 1){
                            alert('No record found');
                            console.log('No record found');
                        }
                        else {
                            this.eventList = (response.Table)? response.Table:[];
                        }
                    });
                }catch(e){
                    alert(e);
                    console.log(e);
                }
            },
            eventNewEdit (value) {
                if(value==='New'){
                    this.lblNewEditCalendar = value;
                    this.refreshBModalValue();
                }
                else{
                    this.lblNewEditCalendar = value;
                }
                this.$refs.EventShowModal.show();
            },
            refreshBModalValue(){
                let getCurrentDateTime = new Date();
                this.inputEventTitle = '';
                this.rdEventType = '';
                this.inputEventStartTime = getCurrentDateTime;
                this.inputEventEndTime = getCurrentDateTime;
                this.inputEventRegLimit = '';
                this.inputEventRegCutOffDay = '';
                this.inputEventLocation = '';
                this.optFullDayEvent = false;
                this.optParentSignUp = false;
            },

            //To be Cont..
            async btnEditEvent(){},
            async btnAddClasses(){
                console.log(this.ddlClassLevel);
            },
        },
    }
</script>

<style scoped>

</style>