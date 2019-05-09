<template>
    <div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <b-btn v-b-modal.create_event_modal variant="primary" class="btnCreateEvent">
                Create Event
            </b-btn>
        </div>

        <b-modal id="create_event_modal" Title ="Create Event Calender" ref="EventShowModal" ok-only
                 ok-variant="secondary">

                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12" title="Event Type">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label><h1>Calendar Title</h1></label>
                        <input type="text" class="form-control" v-model="inputEventTitle">
                    </div>

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <label for="publicholiday">Public Holiday</label>
                                <input type ="radio" id="publicholiday" value="PublicHoliday" v-model="picked">
                            </div>

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <label for="schoolclosure">School Closure</label>
                                <input type ="radio" id="schoolclosure" value="SchoolClosure" v-model="picked">
                            </div>

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <label for="event">Event</label>
                                <input type ="radio" id="event" value="Event" v-model="picked" checked>
                            </div>

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <span>Picked: {{ picked }}</span>
                            </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>From</label>
                                <el-date-picker v-model="inputEventStartTime" format="dd-MM-yyyy HH:mm:ss"
                                                value-format="dd-MM-yyyy HH:mm:ss" type="datetime"
                                                placeholder="Pick a day"></el-date-picker>
                            </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>To</label>
                                <el-date-picker v-model="inputEventEndTime" format="dd-MM-yyyy HH:mm:ss"
                                                value-format="dd-MM-yyyy HH:mm:ss" type="datetime"
                                                placeholder="Pick a day"></el-date-picker>
                        <br>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <b-form-group label="Event Details">
                            <b-form-checkbox-group
                                    v-model="selected"
                                    :options="options"
                                    switches
                                    stacked
                            ></b-form-checkbox-group>
                        </b-form-group>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Registration cutoff(days)</label>
                        <input type="text" class="form-control" v-model="inputEventRegCutOffDay" value="0">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Registration Limit</label>
                        <b-form-input id="range-1" v-model="inputEventRegLimit" type="range" value="0" min="0" max="5" step="1"></b-form-input>
                        <div class="mt-2">Days: {{ inputEventRegLimit }}</div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <button v-on:click="btnAddClasses()">Add Classes</button>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Location</label>
                        <input type="text" class="form-control" v-model="inputEventLocation">
                    </div>

                </div>
            <button v-on:click="btnCreateEvent()">Create Event</button>

        </b-modal>

        <div class="container">
            <div>
                <h1>Event Overview</h1>
            </div>
            <div class="row">
                <div class="col-lg">
                    <h5>Event Details</h5>
                    <div style="overflow-x:scroll; height:800px; background:whitesmoke">
                        <ul>
                            <li v-for="item in eventList" v-bind:key="item.EventID" ref="">
                                <a href="">{{item.EventTitle}}</a>
                                <br>
                                {{convertToDate(item.EventStartTime)}}
                                {{getEventTime(item.EventStartTime,item.EventEndTime)}}
                                {{item.EventLocation}}
                                {{item.CONname}}
                                <b-btn class="btnSignUp" v-on:click="btnSignUp()">Sign Up</b-btn>
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
                        <v-calendar title-position="right"></v-calendar>
                        <v-date-picker :mode='mode' v-model='selectedDate'/>
                    </div>
                    <div>
                        <button v-on:click="btnAddToCalendar()">Add to calendar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import Vue from 'vue';
    import VCalendar from 'v-calendar';
    const API_HOST = process.env.VUE_APP_ROOT_API;
    Vue.use(VCalendar, {
        componentPrefix: 'v',  // Use <vc-calendar /> instead of <v-calendar />
        // ...,                // ...other defaults
    });
    export default {
        name: "Event",
        async mounted() {
            await this.LoadEventDetails();
        },
        data(){
            return{
                eventList:[],
                inputEventStartTime:'',
                inputEventEndTime:'',
                picked:"Event",
                selected:[
                ],
                options:[
                    {text:'Full Day event?', value:'fullDayEvent'},
                    {text:'Parent sign up?', value:'parentSignUp'},
                ],
                inputEventRegCutOffDay:'0',
                inputEventRegLimit:'0',
                inputEventTitle:'',
                inputEventLocation:'',
                inputEventDesc:'',

                //v-calendar
                mode:'single',
                selectedDate:null,
            }
        },
        methods:{
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
                    if(diffDays>=1)
                    {
                        return "All Day";
                    }
                    else{
                        Time = starthour + ":" + startminute + "am/pm to " +endhour+":"+endminute+"am/pm";
                        console.log(Time);
                        return Time;
                    }
                }catch{

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
            async btnSignUp(){},
            async btnCreateEvent(){
                console.log(this.inputEventTitle);
                console.log(this.picked);
                console.log(this.inputEventStartTime);
                console.log(this.inputEventEndTime);
                console.log(this.selected);
                //console.log(this.options.selected);
                console.log(this.inputEventRegCutOffDay);
                console.log(this.inputEventRegLimit);
                console.log(this.inputEventLocation);

                try
                {
                    var withdrawObj = {
                        EventTitle:this.inputEventTitle,
                        EventType:this.picked,
                        EventStartTime:this.inputEventStartTime,
                        EventEndTime:this.inputEventEndTime,
                            //temp value
                        EventFullDay:"Yes",
                        EventParentSignUp:"No",
                            //end temp value
                        EventRegCutOffDay:this.inputEventRegCutOffDay,
                        EventRegLimit:this.inputEventRegLimit,
                        EventLocation: this.inputEventLocation,
                        // EventDesc:this:inputEventDesc

                    };

                    if(this.inputEventTitle=== '' || this.inputEventTitle === null || this.inputEventTitle === undefined){
                        alert('Please create event title.');
                    }
                    else if(this.inputEventStartTime === '' || this.inputEventStartTime === null || this.inputEventStartTime === undefined){
                        alert('Please select date from.');
                    }
                    else if(this.inputEventEndTime === '' || this.inputEventEndTime === null || this.inputEventEndTime === undefined){
                        alert('Please select date to');
                    }
                    else{

                        const response = await DataSource.shared.saveEvent(JSON.stringify(withdrawObj));

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
                catch (e) {
                    alert(e);
                    console.log(e);
                }
            },
            async btnAddClasses(){

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
                            console.log('1');
                        }
                    });
                }catch(e){
                    alert(e);
                    console.log(e);
                }
            },
        },
    }
</script>

<style scoped>

</style>