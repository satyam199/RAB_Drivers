import React, { useState,useEffect} from 'react';
import { Text, View, StyleSheet,ActivityIndicator, TextInput, ScrollView, Image, TouchableOpacity, StatusBar ,FlatList,ImageBackground} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import externalstyle from '../styles/commonStyles';
import { setToken, readName, setData, readData, setValue, readValue } from '../utilities/storage';



const HistoryScreen = ({ navigation }) => {

  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [newToken, setNewToken] = useState()
  const [dataD, setDataD] = useState()
  const [showLoader, setshowLoader] = useState(false)
  const [status ,setStatus] = useState(1)
  const [whole, setWhole] = useState()
  // const [Pending ,setPending] = useState()
  // const [inProgress ,setInProgress] = useState()

  // const [date, setDate] = useState(true);
  // console.log(date);
 

  useEffect(() => {
    readName('token').then(res => {
      const res_data = JSON.parse(res);
      setNewToken(res_data)})   
      readData('data').then(res=>{
        console.log(res,"yellow");
        const res_data = JSON.parse(res);
        setWhole(res_data)
        })
    
     // this.timer = setInterval(async()=> await Offer(), 1000)
   },[]);


  useEffect(() => {
    Offer()
    const unsubscribe = navigation.addListener('focus', () => {
      Offer()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
    // Offer()
  },[newToken,])
  
  const getCurrentLocation = async()=>{
    console.log('inArray');
    const locPermissionDenied = await locationPermission()
    console.log('location permission',locPermissionDenied);
  }

  function showDatePicker() {
    setDatePicker(true);
  };

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  };

   
    const Offer = () => {
      setshowLoader(true)
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + newToken?.token,},
      };
      try {
        const response = fetch('https://admin.tripperpedia.in/api/v1/taxi_driver/bookingList', requestOptions)
          .then(response => response.text())
          .then(result => {
            const res_data = JSON.parse(result);
            console.log(res_data, "weeeee")
            //console.log(parse_data, "hhh")
            setDataD(res_data.data)
            if(res_data.status == 200){
              setshowLoader(false)
            }
          })
          .catch(error => console.log('error', error));
        //    const data = response.json();          
      }
      catch (error) {
        console.error("Fetching api error: ", error);
      }
    }

    const filteredData = dataD
      ? dataD.filter(x =>
          x.status.includes(status) && moment(x?.start_date_time).format('DD-MM-YYYY').includes(moment(date).format('DD-MM-YYYY'))
        )
      : dataD;

    const renderItemOneView = () => {
      //console.log(dataD,"LM");
      console.log(filteredData?.length);
      return (
        <>
        {filteredData?.length != 0? 
        <ScrollView>
          <FlatList
            data={filteredData}
            renderItem={({ item, index }) => viewOneFlatList(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>:
         <View style={{alignItems: 'center',marginVertical: '20%'}}>
         <Image
           resizeMode='contain'
           style={{width:80, height:80}}
           source={require('../../asets/icons/ic_empty.png')}
         />
         <Text style={{ color: 'white', textAlign: 'center',alignSelf: 'center',
         justifyContent: 'center',
         alignItems: 'center',
         textAlignVertical: 'center',
         fontSize: 10,
         alignContent: 'center', marginHorizontal: 20,marginBottom: 35}}>{"Oops! We couldn\'t find any activities or experiences that matched. Please try searching again or browse through our most popular activities and destinations below."}</Text>
       </View>
      }
      </>
      )
    }

 
    const viewOneFlatList = (item, index) => {
      //const {dataD} = this.state
      //console.log(item, "hhh");
      var str = item?.start_date_time;
      var new_str = str.replace('Z', '');
      var new_one = new_str.replace('T', ' ') 
      console.log(new_one,"''''''''''''''''''''''''''''");
     
      const sTime = moment(item?.start_date_time, "HH:mm");
  
      const currentTimeVal = moment(new Date()).format('HH:mm');
  
      const currentTime = moment(currentTimeVal, "HH:mm")
  
      var minutes = sTime.diff(currentTime, 'minutes');

      // console.log(sTime,currentTimeVal,currentTime,minutes,moment(item?.start_date_time).format('HH:MM'),"minutes");
      // console.log(date1, item?.start_date_time , moment(new Date(item?.start_date_time)).format('hh:mm A') );
      // console.log(moment(new Date("2022-10-12")).format('hh:mm'), moment(item?.start_date_time).format('hh:mm'));
      let DateS = moment(item?.start_date_time).format('DD-MM-YYYY')
      let time =  moment(item?.start_date_time).format('hh:mm')
      console.log(moment(new_one).format('hh:mm'));
      console.log(moment(date1).format('DD-MM-YYYY'),moment(item?.start_date_time).format('DD-MM-YYYY'),"CURRENT DATE");
      console.log(status == 6 && moment(date1).format('DD-MM-YYYY') == moment(item?.start_date_time).format('DD-MM-YYYY') && item?.status == 6 && moment(date1).format('hh:mm') >= moment(new_one).format('hh:mm'),"condition log");
      console.log(status == 6 && Date.now() >= item?.start_date_time && date1.getDate() == item?.start_date_time);
      console.log(item?.start_date_time,date1,"the timestamp");
       return (
      
        <View style={Style.first}>
        
          <View style={Style.forRed}></View>

          <Text style={Style.fromAddress}>{item?.pickup_location}</Text>

          <View style={Style.forHorizontal}></View>

          <View style={Style.forGreen}></View>
        
          <Text style={Style.toAddress}>{item?.drop_location}</Text>

          <Text style={{marginTop: 10, marginHorizontal: 20, color : '#ffd700'}}>{item?.status == 1 ? 'Pending' :
             item?.status == 2 ? "In-progress" :
              item?.status == 4 ? "Completed" :
              item?.status == 5 ? "Cancelled" :  item?.status == 6 ? "Booked" : ''}</Text>

          <View style={Style.forVertical}></View>
        
          {/* <View style={Style.forImage}>
            <Image style={Style.customerImage}
             source={{ uri: item?.user?.image }}/>
          </View> */}
        <View style={{flexDirection: 'row'}}>
          <View Style={{flexDirection:'coloum'}}>
          <Text style={Style.customer}>{item?.user?.first_name} {item?.user?.last_name}</Text>
          <Text style={Style.customerName}>{item?.user?.email }</Text>
          <Text style={[Style.customerName,{marginBottom: 10}]}>{moment(item?.start_date_time).format('MMMM Do, YYYY')}</Text>
          </View>
        <View style = {{alignSelf: 'center',marginHorizontal: 100}}>
        <Text style={Style.completed}>
            {item?.status == 1 ? '' :
             item?.status == 2 ? '' :
              item?.status == 4 ? '' :
               item?.status == 5 ? '' :
              //  status == 6 && moment(date1).format('DD-MM-YYYY') != moment(item?.start_date_time).format('DD-MM-YYYY') && item?.status == 6 && moment(date1).format('hh:mm') != moment(new_one).format('hh:mm')? <View style={[Style.forSend,{marginHorizontal: 190}]}>
              //  <View style={[Style.forNosend, { marginTop: 0}]}>
              //        <Text style={Style.send}>START TRIP</Text>
              //        </View>
              //    </View> : 
              //  status == 6 && moment(date1).format('DD-MM-YYYY') == moment(item?.start_date_time).format('DD-MM-YYYY') && item?.status == 6 && moment(date1).format('hh:mm') >= moment(new_one).format('hh:mm')  ? 
              // <View style={[Style.forSend,{marginHorizontal: 190}]}>
              //  <TouchableOpacity
              //        onPress={()=>navigation.navigate('Map',{item})}
              //        //onPress={() => { sentOffer(item) }}
              //        style={[Style.forsendsend, { marginTop: 0}]}>
              //        <Text style={Style.send}>START TRIP</Text>
              //      </TouchableOpacity>
              //    </View>
                 status == 6 && new Date() <= new Date(`${item?.start_date_time}`) && new Date().getDate() ==  new Date(`${item?.start_date_time}`).getDate() ? 
                           <View style={[Style.forSend, { marginHorizontal: 190 }]}>
                             <TouchableOpacity
                               onPress={() => navigation.navigate('Map', { item })}
                               //onPress={() => { sentOffer(item) }}
                               style={[Style.forsendsend, { marginTop: 0 }]}>
                               <Text style={Style.send}>START TRIP</Text>
                             </TouchableOpacity>
                           </View>
                 :
                 <Text style={Style.send}>START TRIP</Text> }
            </Text>
            </View>
        </View>
          {/* <View style={Style.forVerticalSecond}></View>        */}
          {/* <Text style={Style.completed}>
            {item?.status == 1 ? 'Pending' :
             item?.status == 2 ? "In-progress" :
              item?.status == 4 ? "Completed" :
               item?.status == 7 ?  <View style={[Style.forSend,{marginHorizontal: 190}]}>
               <TouchableOpacity
                     onPress={()=>navigation.navigate('Map',{item})}
                     //onPress={() => { sentOffer(item) }}
                     style={[Style.forsendsend, { marginTop: 0}]}>
                     <Text style={Style.send}>START TRIP</Text>
                   </TouchableOpacity>
                 </View> :
               status == 6 && moment(date1).format('DD-MM-YYYY') != moment(item?.start_date_time).format('DD-MM-YYYY') && item?.status == 6 && moment(date1).format('hh:mm') != moment(new_one).format('hh:mm')? "Booked" : 
               status == 6 && moment(date1).format('DD-MM-YYYY') == moment(item?.start_date_time).format('DD-MM-YYYY') && item?.status == 6 && moment(date1).format('hh:mm') >= moment(new_one).format('hh:mm')  ? 
              <View style={[Style.forSend,{marginHorizontal: 190}]}>
               <TouchableOpacity
                     onPress={()=>navigation.navigate('Map',{item})}
                     //onPress={() => { sentOffer(item) }}
                     style={[Style.forsendsend, { marginTop: 0}]}>
                     <Text style={Style.send}>START TRIP</Text>
                   </TouchableOpacity>
                 </View>:
                 null }
            </Text> */}
        </View>
        
      )
    }
  

  return (
    <View style={externalstyle.container}>
      <ImageBackground
      style={{flex:1}}
      source={require('../../asets/icons/onbaord_bg.png')}>
      <ScrollView>
        <StatusBar hidden={true} />
        {/* <Image style={[externalstyle.backgroundImage,{}]}
          source={require('../../asets/icons/travel-splash23.png')} /> */}

        {/* header start........ */}
        <View style={externalstyle.headerSecond}>
          <View style={externalstyle.forProfile}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}>
              <View style={externalstyle.forProfileImage}>
                <Image style={externalstyle.image}
                  source={{uri: whole?.dataList?.image}} />
              </View>
              <Text style={externalstyle.name}>{whole?.dataList?.first_name} {whole?.dataList?.last_name}</Text>
            </TouchableOpacity>

          </View>
          {/* <View style={externalstyle.forNotification}>
            <TouchableOpacity style={externalstyle.notification}
              onPress={() => navigation.navigate("Notification")}>
              <Image style={externalstyle.notificationImage}
                source={require('../../asets/icons/Group1427.png')} />
            </TouchableOpacity>
          </View> */}
        </View>
        {/* header end...... */}
        {/* <View style={Style.fordate}>
          <Text style={Style.label}>Date</Text>

          {datePicker && (
            <DateTimePicker
              value={date}
              mode={'date'}
              // timeZoneOffsetInMinutes={0}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              // display="default"
              is24Hour={true}
              onChange={onDateSelected}
              onConfirm={(date) => {
                setOpen(true)
                setDate(moment(date).format('DD/MM/YYYY'))
              }}
            />
          )}

          {!datePicker && (
            <View>
              <TextInput keyboardType='numeric' placeholder="dd/mm/yy" placeholderTextColor={"white"} style={externalstyle.input} value={moment(date).format('DD/MM/YYYY')}
              />
            </View>
          )}
        </View> */}

        {/* <TouchableOpacity
          onPress={showDatePicker}>
          <Image style={Style.dateImage}
            source={require('../../asets/icons/calendar-week.png')}
          // onPress={showDatePicker}
          />
        </TouchableOpacity> */}

        <Text style={Style.booking}>Bookings {}</Text>
      <View>
      
      <View style={{flex: 1, flexDirection: 'row' , marginBottom:30,}}>
       
        <ScrollView 
            horizontal={true}
            //showsHorizontalScrollIndicator={true}
            //pagingEnabled={true}
            contentContainerStyle={{paddingRight: 80}}
            >
              
            <TouchableOpacity style={{ width: '20%', height: '55%', marginTop: 20, borderRadius: 8, marginHorizontal: 5,marginLeft:15 }}
              onPress={() => {setStatus(1)}}
            >
              <View style={{ backgroundColor: status == 1 ? 'white' : 'transparent', borderRadius: 6, borderWidth:0.8, borderColor:'white'}}>
                <Text
                  style={{ color: status == 1 ? 'red' : 'white', fontSize: 14, paddingVertical: 3, paddingHorizontal: 3,alignSelf: 'center', }}>
                  {'Pending'}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: '20%', height: '55%', marginTop: 20, borderRadius: 8, marginHorizontal: 5, }}
              onPress={() => {setStatus(6)}}
            >
              <View style={{ backgroundColor: status == 6 ? 'white' : 'transparent', borderRadius: 6, borderWidth:0.8, borderColor:'white' }}>
                <Text
                  style={{ color: status == 6 ? 'red' : 'white', fontSize: 14, paddingVertical: 3, paddingHorizontal: 5, alignSelf: 'center', }}>
                  {'Booked'}
                </Text>
              </View>
            </TouchableOpacity>    

            <TouchableOpacity style={{ width: '22%', height: '55%', marginTop: 20, borderRadius: 8, marginHorizontal: 5 }}
              onPress={() => {setStatus(2)}}
            >
              <View style={{ backgroundColor: status == 2 ? 'white' : 'transparent', borderRadius: 6, borderWidth:0.8, borderColor:'white' }}>
                <Text
                  style={{ color: status == 2 ? 'red' : 'white', fontSize: 14, paddingVertical: 3, paddingHorizontal: 5,alignSelf: 'center',  }}>
                  {'In-progress'}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: '22%', height: '55%', marginTop: 20, borderRadius: 8, marginHorizontal: 5,}}
              onPress={() => {setStatus(4)}}
            >
              <View style={{ backgroundColor: status == 4 ? 'white' : 'transparent', borderRadius: 6,borderWidth:0.8, borderColor:'white' }}>
                <Text
                  style={{ color: status == 4 ? 'red' : 'white', fontSize: 14, paddingVertical: 3, paddingHorizontal: 5,alignSelf: 'center', }}>
                  {'Completed'}
                </Text>
              </View>
            </TouchableOpacity>
        
            <TouchableOpacity style={{ width: '20%', height: '55%', marginTop: 20, borderRadius: 8, marginHorizontal: 5}}
              onPress={() => {setStatus(5)}}
            >
              <View style={{ backgroundColor: status == 5 ? 'white' : 'transparent', borderRadius: 6,  borderWidth:0.8, borderColor:'white' }}>
                <Text
                  style={{ color: status == 5 ? 'red' : 'white', fontSize: 14, paddingVertical: 3, paddingHorizontal: 5,alignSelf: 'center',  }}>
                  {'Cancelled'}
                </Text>
              </View>
            </TouchableOpacity>      
          </ScrollView>
        </View>

        <View style={Style.fordate}>
          <Text style={Style.label}>Date</Text>

          {datePicker && (
            <DateTimePicker
              value={date}
              mode={'date'}
              // timeZoneOffsetInMinutes={0}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              // display="default"
              is24Hour={true}
              onChange={onDateSelected}
              onConfirm={(date) => {
                setOpen(true)
                setDate(moment(date).format('DD/MM/YYYY'))
              }}
            />
          )}

          
            <View>
              <TextInput keyboardType='numeric' placeholder="dd/mm/yy" placeholderTextColor={"white"} style={externalstyle.input} value={moment(date).format('DD/MM/YYYY')}
              />
            </View>
          
        </View>
        <TouchableOpacity
          onPress={showDatePicker}>
          <Image style={Style.dateImage}
            source={require('../../asets/icons/calendar-week.png')}
          // onPress={showDatePicker}
          />
        </TouchableOpacity>
        
        </View>
        {renderItemOneView()}
      </ScrollView>
      </ImageBackground>
    </View>
  );
}

const Style = StyleSheet.create({
  label: {
    marginHorizontal: 25,
    fontSize: 16,
    color: "white",
    //marginTop: 20,
    fontFamily: 'Roboto',
    opacity: 0.6,
  },
  fordate: {
   // marginTop: 10,
    //backgroundColor: 'transprant',
    height: 90,
  },
  booking: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 15,
    marginTop: 20,
  },
  first: {
    backgroundColor: "#262626",
    marginHorizontal: 20,
    borderRadius: 12,
    marginVertical: 10
    // marginTop:8,
  },
  forRed: {
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 2,
    marginHorizontal: 20,
    marginTop: 20,
  },
  forGreen: {
    width: 10,
    height: 10,
    backgroundColor: "#00c443",
    // marginTop:30,
    borderRadius: 2,
    marginHorizontal: 20,
  },
  fromAddress: {
    color: "white",
    fontSize: 14,
    marginLeft: 50,
    marginTop: -15,
    marginHorizontal: 5,
  },
  toAddress: {
    color: "white",
    fontSize: 14,
    marginLeft: 50,
    marginTop: -15,
    marginHorizontal: 10,
  },
  forVertical: {
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    marginHorizontal: 20,
    marginTop: 10,
  },
  forImage: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 6,
  },
  customer: {
    color: "white",
    fontSize: 14,
    marginLeft: 20,
    marginTop: 10
    //fontWeight: "bold",
   // marginTop: -70,
  },
  customerName: {
    color: "gray",
    fontSize: 12,
    marginLeft: 20,
  },
  forVerticalSecond: {
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    marginHorizontal: 20,
    marginTop: 40,
    // marginVertical:50.
  },
  completed: {
    textAlign: "center",
    color: "#ffd700",
    // fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  cancelled: {
    textAlign: "center",
    color: "#ee003d",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  second: {
    backgroundColor: "#2d2d2d",
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 10,
    marginVertical: 100,
  },
  image: {
    width: 50,
    height: 50,
  },
  forHorizontal: {
    borderLeftWidth: 1,
    borderLeftColor: "white",
    height: 20,
    marginTop: -2,
    marginBottom: 3,
    marginLeft: 24.5,
  },
  dateImage: {
    width: 20,
    height: 20,
    justifyContent:'flex-end',
    alignItems:'flex-end',
    alignSelf:'flex-end',
    marginHorizontal:20,
    // marginLeft: 320,
    marginTop: -60,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  customerImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
  forsendsend: {
    width: 100,
   height: 35,
   backgroundColor: "#00c443",
   borderRadius: 8,
   marginRight: 30
   //marginTop: 30,
   //marginHorizontal:20
 },
 forNosend: {
  width: 100,
 height: 35,
 backgroundColor: "gray",
 borderRadius: 8,
 marginRight: 30
 //marginTop: 30,
 //marginHorizontal:20
},
  send: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    marginTop: 5,
  },
})

export default HistoryScreen;