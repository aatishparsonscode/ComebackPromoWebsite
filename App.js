import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState,useEffect,useCallback} from 'react'
import { StyleSheet, Text, View, Platform, Dimensions,Button,TouchableOpacity,Linking,ScrollView, FlatList,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Video, AVPlaybackStatus } from 'expo-av';
import YoutubePlayer from "react-native-youtube-iframe";
import { Ionicons,Entypo,FontAwesome,FontAwesome5,MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as MailComposer from 'expo-mail-composer';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Rect, Ellipse,Path } from 'react-native-svg';

const Drawer = createDrawerNavigator();

export default function App() {
  const colorForDrawer = '#498df5'
  return (
    <NavigationContainer>
      <Drawer.Navigator 
      //screenOptions={{drawerType : Dimensions.get('window').height < Dimensions.get('window').width ? 'permanent' : 'slide',headerShown: Dimensions.get('window').height < Dimensions.get('window').width ? false : true}}
      screenOptions={({ navigation }) => ({ 
        headerStyle:{height:10},
        headerLeft: () => <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{marginLeft:10}}> 
        <FontAwesome5 name='bars' color='white' size={20} />
        </TouchableOpacity>
     })}
      >
        <Drawer.Screen name="Home" component={Home} options={({navigation}) => ({headerTransparent:false,drawerLabel:"Home",drawerIcon: ({focused, size}) => (
                <Ionicons name="home-outline"
                  size={size}
                  color={focused ? colorForDrawer : 'grey'}
                />
        )
        
        ,header: isPhone() ? () => 
                <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between',backgroundColor:"#00406E"}}>
                  <View>
                
                  <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{marginLeft:10}}> 
                    <FontAwesome5 name='bars' color='white' size={20} />
                  </TouchableOpacity>
                   
                  </View>
                  <View style={{justifyContent:'center'}}>
                    <Text style={{fontSize:getVideoWidth()/15,fontStyle:"italic",fontWeight:'bold',color:Colors.textColor,alignSelf:'center',textAlign:'center'}}>Comeback</Text>
                  </View>
                  <View>
                    <Text>   </Text>
                  </View>
                  
                </View>
                :
                () => 
                <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'center',backgroundColor:"#00406E",borderBottomColor:'white',borderBottomWidth:1,paddingVertical:10,flex:1}}>
                  <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:getVideoWidth()/17,fontStyle:"italic",fontWeight:'bold',color:Colors.textColor,alignSelf:'center',textAlign:'center'}}>Comeback</Text>
                    {/* <Image source={require("./assets/applogoTransparent3.png")} style={{height:getVideoWidth()/17-5,width:getVideoWidth()/17-5,alignSelf:'center',marginLeft:20}} resizeMode="contain"/> */}
                  </View>
                  <View style={{flex:3}}>
                    <Text>   </Text>
                  </View>
                  <View style={{flex:4,flexDirection:'row',justifyContent:'space-evenly'}}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:"#006FA2",borderRadius:20,paddingHorizontal:10,paddingVertical:5}}> 
                      <Ionicons name="home-outline" size={30} color = "white"/>
                      <Text style={{fontSize:getVideoWidth()/35,color:Colors.textColor,alignSelf:'center',textAlign:'center',marginLeft:7}}>Home</Text>
                      
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("About")} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:20,paddingHorizontal:10,paddingVertical:5}}> 
                      <MaterialCommunityIcons name="information-outline" size={30} color = "white" />
                      <Text style={{fontSize:getVideoWidth()/35,color:Colors.textColor,alignSelf:'center',textAlign:'center',marginLeft:7}}>About</Text>
                      
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Contact")} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:20,paddingHorizontal:10,paddingVertical:5}}> 
                      <Ionicons name="ios-chatbubble-ellipses-outline" size={30} color = "white" />
                      <Text style={{fontSize:getVideoWidth()/35,color:Colors.textColor,alignSelf:'center',textAlign:'center',marginLeft:7}}>Contact</Text>
                      
                    </TouchableOpacity>
                  </View>
                </View>
      })}/>
        <Drawer.Screen name="About" component={About} options={({navigation}) => ({headerTransparent:false,drawerLabel:"About",drawerIcon: ({focused, size}) => (
                <MaterialCommunityIcons name="information-outline"
                  size={size}
                  color={focused ? colorForDrawer : 'grey'}
                />
        )
        
        ,header: isPhone() ? () => 
                <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between',backgroundColor:"#00406E"}}>
                  <View>
                
                  <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{marginLeft:10}}> 
                    <FontAwesome5 name='bars' color='white' size={20} />
                  </TouchableOpacity>
                   
                  </View>
                  <View style={{justifyContent:'center'}}>
                    <Text style={{fontSize:getVideoWidth()/15,fontStyle:"italic",fontWeight:'bold',color:Colors.textColor,alignSelf:'center',textAlign:'center'}}>About</Text>
                  </View>
                  <View>
                    <Text>   </Text>
                  </View>
                  
                </View>
                :
                () => 
                <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'center',backgroundColor:"#00406E",borderBottomColor:'white',borderBottomWidth:1,paddingVertical:10,flex:1}}>
                  <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:getVideoWidth()/17,fontStyle:"italic",fontWeight:'bold',color:Colors.textColor,alignSelf:'center',textAlign:'center'}}>Comeback</Text>
                    {/* <Image source={require("./assets/applogoTransparent3.png")} style={{height:getVideoWidth()/17-5,width:getVideoWidth()/17-5,alignSelf:'center',marginLeft:20}} resizeMode="contain"/> */}
                  </View>
                  <View style={{flex:3}}>
                    <Text>   </Text>
                  </View>
                  <View style={{flex:4,flexDirection:'row',justifyContent:'space-evenly'}}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:20,paddingHorizontal:10,paddingVertical:5}}> 
                      <Ionicons name="home-outline" size={30} color = "white"/>
                      <Text style={{fontSize:getVideoWidth()/35,color:Colors.textColor,alignSelf:'center',textAlign:'center',marginLeft:7}}>Home</Text>
                      
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("About")} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:"#006FA2",borderRadius:20,paddingHorizontal:10,paddingVertical:5}}> 
                      <MaterialCommunityIcons name="information-outline" size={30} color = "white" />
                      <Text style={{fontSize:getVideoWidth()/35,color:Colors.textColor,alignSelf:'center',textAlign:'center',marginLeft:7}}>About</Text>
                      
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Contact")} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:20,paddingHorizontal:10,paddingVertical:5}}> 
                      <Ionicons name="ios-chatbubble-ellipses-outline" size={30} color = "white" />
                      <Text style={{fontSize:getVideoWidth()/35,color:Colors.textColor,alignSelf:'center',textAlign:'center',marginLeft:7}}>Contact</Text>
                      
                    </TouchableOpacity>
                  </View>
                </View>
              })}/>
        <Drawer.Screen name="Contact" component={Contact} options={({navigation}) => ({headerTransparent:false,drawerLabel:"Contact",drawerIcon: ({focused, size}) => (
                <Ionicons name="ios-chatbubble-ellipses-outline"
                  size={size}
                  color={focused ? colorForDrawer : 'grey'}
                />
        )
        
        ,header: isPhone() ? () => 
                <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between',backgroundColor:"#00406E"}}>
                  <View>
                
                  <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{marginLeft:10}}> 
                    <FontAwesome5 name='bars' color='white' size={20} />
                  </TouchableOpacity>
                   
                  </View>
                  <View style={{justifyContent:'center'}}>
                    <Text style={{fontSize:getVideoWidth()/15,fontStyle:"italic",fontWeight:'bold',color:Colors.textColor,alignSelf:'center',textAlign:'center'}}>Contact</Text>
                  </View>
                  <View>
                    <Text>   </Text>
                  </View>
                  
                </View>
                :
                () => 
                <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'center',backgroundColor:"#00406E",borderBottomColor:'white',borderBottomWidth:1,paddingVertical:10,flex:1}}>
                  <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:getVideoWidth()/17,fontStyle:"italic",fontWeight:'bold',color:Colors.textColor,alignSelf:'center',textAlign:'center'}}>Comeback</Text>
                    {/* <Image source={require("./assets/applogoTransparent3.png")} style={{height:getVideoWidth()/17-5,width:getVideoWidth()/17-5,alignSelf:'center',marginLeft:20}} resizeMode="contain"/> */}
                  </View>
                  <View style={{flex:3}}>
                    <Text>   </Text>
                  </View>
                  <View style={{flex:4,flexDirection:'row',justifyContent:'space-evenly'}}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:20,paddingHorizontal:10,paddingVertical:5}}> 
                      <Ionicons name="home-outline" size={30} color = "white"/>
                      <Text style={{fontSize:getVideoWidth()/35,color:Colors.textColor,alignSelf:'center',textAlign:'center',marginLeft:7}}>Home</Text>
                      
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("About")} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:20,paddingHorizontal:10,paddingVertical:5}}> 
                      <MaterialCommunityIcons name="information-outline" size={30} color = "white" />
                      <Text style={{fontSize:getVideoWidth()/35,color:Colors.textColor,alignSelf:'center',textAlign:'center',marginLeft:7}}>About</Text>
                      
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Contact")} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:"#006FA2",borderRadius:20,paddingHorizontal:10,paddingVertical:5}}> 
                      <Ionicons name="ios-chatbubble-ellipses-outline" size={30} color = "white" />
                      <Text style={{fontSize:getVideoWidth()/35,color:Colors.textColor,alignSelf:'center',textAlign:'center',marginLeft:7}}>Contact</Text>
                      
                    </TouchableOpacity>
                  </View>
                </View>
              })}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function isPhone(){
  return Dimensions.get('window').height > Dimensions.get('window').width
}

function getVideoWidth(){
  if(isPhone()){
    return Dimensions.get('window').width
  }else{
    return Dimensions.get('window').width * 0.57
  }
}

function getVideoHeight(){
  if(isPhone()){
    return Dimensions.get('window').width / (16/9)
  }else{
    return Dimensions.get('window').width*0.57 / (16/9)
  }
}
export function Home() {
  const [playing, setPlaying] = useState(false);
  const [showVideo,setShowVideo] = useState(false)
  const [topHeight,setTopHeight] = useState(0)
  const navigation = useNavigation()

  const onLayout=(event)=> {
    const {x, y, height, width} = event.nativeEvent.layout;
    setTopHeight(height)
    
  }

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const reviews = [
    
    "This app is a blessing. My husband and i have to move and need a low income place. They have numbers and addresses to agencies and charities. They also have a list of shelters near you, Rehab centers, food pantries, hospitals. I mean people can really benefit from this app. Wonderful app for anyone struggling.",
    "Map and chat seems very handy. I believe access to all important things and contacts in an easy interface will be beneficial to the community",
    "This app is super resourceful and easy to use. I am still amazed by the amount of resources near me! Even living in a less populated areas I was able to find what I needed. 10/10! One more thing to add is the real-time jobs is super helpful as well, I was able to make a lot of quick cash.",
    "Very easy and simple to navigate. Had no trouble logging in and finding nearby locations for various items.",
    "Has tons of resources for people who are in need.",
    "Absolutely, amazing!!! Best resource app yet!!! 💙💙💙",
    "Lots of information",
  ]

  return (
    <LinearGradient colors={['#4ca3d9', '#0600b0']} start={{x:0.34,y:0.4}} style={{ flex: 1,height:Dimensions.get('window').height,width:Dimensions.get('window').width }}>
    <View style={{flex:1,flexDirection: isPhone() ? "column" : "row"}}
     >
      <View onLayout={onLayout} style={{backgroundColor:"#2689BD",shadowOpacity:5,shadowRadius:5,zIndex:10,position:isPhone() ? "absolute":'relative',overflow:'visible',borderBottomLeftRadius:0}}>
        {/* <View style={{justifyContent:'center'}}>
          <Text style={{fontSize:getVideoWidth()/15,fontStyle:"italic",fontWeight:'bold',color:Colors.textColor,alignSelf:'center',textAlign:'center'}}>Comeback</Text>
        </View> */}
        <View>
        
        
       
        {!showVideo ?
          <View style={{width:getVideoWidth(),height:getVideoHeight(),flexDirection:'row'}}>
            
            <View style={{flexDirection:'row',flex:9,paddingLeft:30,paddingTop:10}}>
              <Image
                style={{width:getVideoWidth()/3.2 *0.85,height:getVideoHeight() * 0.85,zIndex:5}}
                source={require("./assets/transparentAppPic2.png")}
              />
              <Image
                style={{width:getVideoWidth()/3.2 * 0.85,height:getVideoHeight()* 0.85,top:getVideoHeight() * 0.067,zIndex:10,right:getVideoWidth() * 0.085}}
                source={require("./assets/transparentAppPic1.png")}
              />
            </View>
            <View style={{alignItems:'center',justifyContent:'space-evenly',flex:11}}>
              <View style={{justifyContent:'flex-start',alignItems:'flex-start',paddingHorizontal:25}}>
                <Text style={{textAlign:'center',fontWeight:'500',color:'white',fontSize:getVideoWidth()/35}}>Serving 5,500+ individuals across the United States</Text>
               
              </View>
              
              {/* <Text style={{marginHorizontal:30,textAlign:'center',marginBottom:10,color:'white',fontSize:19}}>Find help fast with the <Text style={{fontWeight:'bold'}}>chat</Text>, <Text style={{fontWeight:'bold'}}>forum</Text>, <Text style={{fontWeight:'bold'}}>hotlines</Text>, and <Text style={{fontWeight:'bold'}}>interactive map</Text>!</Text> */}
              <TouchableOpacity onPress={() => setShowVideo(!showVideo)}>
                <Image
                  style={{width:getVideoWidth() * 0.33,height:getVideoWidth() * 0.33 * 305/600,zIndex:5,borderRadius:15}}
                  source={require("./assets/videoPlaceHolder.png")}
                />
                <Text style={{marginTop:10,color:Colors.textColor,alignSelf:'center',fontSize:13,textDecorationLine:'underline'}}>Video Demo</Text>
              </TouchableOpacity>
            </View>
          </View>
        :
          <YoutubePlayer
            
            width = {getVideoWidth()}
            height={getVideoHeight()}
            play={playing}
            videoId={"MfCp7I0tVX8"}
            onChangeState={onStateChange}
            loop={true}
          /> 
        }
        </View>
        {isPhone() ? 
      
        null
        
        : 
        <View style={{alignItems:'center',maxWidth:500,alignSelf:'center'}}>
          <Text style={{fontSize:20,fontWeight:'bold',color:Colors.textColor,marginTop:10}}>Get Comeback on iOS or Android</Text>
          <View style={{flexDirection:'row', justifyContent:'space-evenly',padding:10,width:'100%',alignItems:'center'}}>
            
            <TouchableOpacity style={{borderWidth:0,borderColor:'white',paddingVertical:10,paddingHorizontal:17,borderRadius:20}} onPress={() => Linking.openURL("https://apps.apple.com/us/app/comeback-homeless-resources/id1539368980")}>
              <View style={{alignItems:'center'}}>
                <Entypo name="app-store" size={50} color="white" />
                <Text style={{color:Colors.textColor,textDecorationLine:'underline'}}>App Store</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:0,borderColor:'white',padding:10,borderRadius:20}} onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=com.aidanz.telemedicine")}>
            <View style={{alignItems:'center'}}>
              <Entypo name="google-play" size={50} color="white" />
              <Text style={{color:Colors.textColor,textDecorationLine:'underline'}}>Google Play</Text>
            </View>
            </TouchableOpacity>
          </View>
        </View>
      }
      </View>
      <ScrollView contentContainerStyle={{alignItems:'center',margin:5,marginTop:isPhone() ? topHeight: 0}} style={{flex:1,backgroundColor : isPhone() ? null : "#006FA2",shadowRadius:isPhone() ? 0:5}} showsVerticalScrollIndicator={false}>
        {!isPhone() ? null : 
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:Colors.textColor,marginTop:10}}>Get Comeback on iOS or Android</Text>
            <View style={{flexDirection:'row', justifyContent:'space-evenly',padding:10,width:'100%',alignItems:'center'}}>
              
              <TouchableOpacity style={{borderWidth:0,borderColor:'white',paddingVertical:10,paddingHorizontal:17,borderRadius:20}} onPress={() => Linking.openURL("https://apps.apple.com/us/app/comeback-homeless-resources/id1539368980")}>
                <View style={{alignItems:'center'}}>
                  <Entypo name="app-store" size={50} color="white" />
                  <Text style={{color:Colors.textColor,textDecorationLine:'underline'}}>App Store</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{borderWidth:0,borderColor:'white',padding:10,borderRadius:20}} onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=com.aidanz.telemedicine")}>
              <View style={{alignItems:'center'}}>
                <Entypo name="google-play" size={50} color="white" />
                <Text style={{color:Colors.textColor,textDecorationLine:'underline'}}>Google Play</Text>
              </View>
              </TouchableOpacity>
            </View>
          </View>
        }
        <View style={{}}>
          <Text style={{color:Colors.textColor,fontWeight:'bold',fontSize:20,marginBottom:5,marginLeft:30}}>Key Features</Text>
          <View style={{backgroundColor:"#2192D9",paddingLeft:10,borderTopRightRadius:20,borderBottomRightRadius:20,shadowOpacity:0.2,shadowRadius:5,elevation:10,marginRight:35}}>
            <View style={{flexDirection:'row', alignItems:'center',width:'100%',marginTop:10}}>
              {/* <Ionicons name="map" color="white" size={30} style={{marginRight:5}}/> */}
              <Text style={{color:Colors.textColor,fontWeight:'bold',fontSize:15}}>Interactive Resources Map</Text>
            </View>
            <View style={styles.textDescription}>
              <Text style={{color:Colors.textColor,marginBottom:5}}>Hundreds of nearby resources</Text>
              <Text style={{color:Colors.textColor,marginBottom:5}}>Coverage in 50 US states and 90% of cities, towns, metros, and more</Text>
              <Text style={{color:Colors.textColor,marginBottom:5}}>15 resource categories</Text>
              <Text style={{color:Colors.textColor,marginBottom:5}}>Addresses, phone numbers, websites, and more</Text>
              <Text style={{color:Colors.textColor,marginBottom:5}}>Find hotspots with multiple resources in close proximity to one another via filters</Text>
              <Text style={{color:Colors.textColor,marginBottom:5}}>Add private locations (charging spots, bathrooms, etc.)</Text>
              <Text style={{color:Colors.textColor,marginBottom:5}}>Favorite your favorite locations</Text>
              <Text style={{color:Colors.textColor,marginBottom:5}}>Plan transit through multiple places (options -{'>'} Bus Routes)</Text>
            </View>
          </View>

          <View style={{backgroundColor:"#2192D9",paddingLeft:10,borderTopLeftRadius:20,borderBottomLeftRadius:20,shadowOpacity:0.2,shadowRadius:5,marginLeft:35,marginVertical:10}}>
          <View style={{flexDirection:'row', alignItems:'center',width:'100%'}}>
            {/* <Ionicons name="md-chatbubbles" color="white" size={30} style={{marginRight:5}}/> */}
            <Text style={{color:Colors.textColor,fontWeight:'bold',fontSize:15,marginTop:10}}>Chat</Text>
          </View>
          
          <View style={styles.textDescription}>
            <Text style={{color:Colors.textColor,marginBottom:5}}>Chat with experts</Text>
            <Text style={{color:Colors.textColor,marginBottom:5}}>Chat with a very resourceful chatbot</Text>
          </View>
          </View>

          <View style={{backgroundColor:"#2192D9",paddingLeft:10,borderTopRightRadius:20,borderBottomRightRadius:20,shadowOpacity:0.2,shadowRadius:5,marginRight:35}}>
            <View style={{flexDirection:'row', alignItems:'center',width:'100%'}}>
              {/* <Entypo name="chat" color="white" size={30} style={{marginRight:5}}/> */}
              <Text style={{color:Colors.textColor,fontWeight:'bold',fontSize:15,marginTop:10}}>Forum</Text>
            </View>
            
            <View style={styles.textDescription}>
              <Text style={{color:Colors.textColor,marginBottom:5}}>Ask anything of the community</Text>
              <Text style={{color:Colors.textColor,marginBottom:5}}>Contribute to the community by answering questions{"\n"}and sharing important tips and information</Text>
            </View>
          </View>

          <View style={{backgroundColor:"#2192D9",paddingLeft:10,borderTopLeftRadius:20,borderBottomLeftRadius:20,shadowOpacity:0.2,shadowRadius:5,marginLeft:35,marginVertical:10}}>
            <View style={{flexDirection:'row', alignItems:'center',width:'100%'}}>
              {/* <FontAwesome name="phone" color="white" size={30} style={{marginRight:5}}/> */}
              <Text style={{color:Colors.textColor,fontWeight:'bold',fontSize:15,marginTop:10}}>Hotlines</Text>
            </View>
            <View style={styles.textDescription}>
              <Text style={{color:Colors.textColor,marginBottom:5}}>Conveniently access up to 90 hotlines</Text>
            </View>
          </View>
          <View style={{paddingLeft:10}}>
            <Text style={{color:Colors.textColor,fontWeight:'bold',fontSize:20,marginTop:10}}>Add an Organization</Text>
            <View style={styles.textDescription}>
              <Text style={{color:Colors.textColor}}>If you would like to add an organization to this app, please install it and navigate to "Add a Public Location" which can be found in the side menu. For the safety of our users, we will briefly review submissions before publishing them.</Text>
            </View>

            <Text style={{color:Colors.textColor,fontWeight:'bold',fontSize:20,marginTop:10}}>Privacy</Text>
            <View style={styles.textDescription}>
              <Text style={{color:Colors.textColor}}>We take your privacy very seriously which is why we only ask for the state you are residing in, and your location. Your location never leaves your device but is necessary to fetch the resources closest to you.</Text>
            </View>

            <Text style={{color:Colors.textColor,fontWeight:'bold',fontSize:20,marginTop:10}}>Community Feedback</Text>
    
            <FlatList
              style={{width:isPhone() ? getVideoWidth() : Dimensions.get('window').width * 0.43}}
              data={reviews}
              showsHorizontalScrollIndicator={true}
              horizontal={true}
              
              renderItem={({item,index}) => (
              
                    <View style={{width:300,backgroundColor:'white',height:210, padding:15,margin:10,borderRadius:30,justifyContent:'flex-start',borderWidth:0,borderColor:'black',shadowOpacity:0.2,shadowRadius:5}}>
                        <Text style = {{color: 'black', textAlign: 'left', fontSize: 15}}>{item}</Text>
                    </View>
              
              )}
            />
            {isPhone() ? null : 
            <View style={{alignItems:'center',maxWidth:500,alignSelf:'center'}}>
              <Text style={{fontSize:20,fontWeight:'bold',color:Colors.textColor,marginTop:10}}>Get Comeback on iOS or Android</Text>
              <View style={{flexDirection:'row', justifyContent:'space-evenly',padding:10,width:'100%',alignItems:'center'}}>
                
                <TouchableOpacity style={{borderWidth:0,borderColor:'white',paddingVertical:10,paddingHorizontal:17,borderRadius:20}} onPress={() => Linking.openURL("https://apps.apple.com/us/app/comeback-homeless-resources/id1539368980")}>
                  <View style={{alignItems:'center'}}>
                    <Entypo name="app-store" size={50} color="white" />
                    <Text style={{color:Colors.textColor,textDecorationLine:'underline'}}>App Store</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth:0,borderColor:'white',padding:10,borderRadius:20}} onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=com.aidanz.telemedicine")}>
                <View style={{alignItems:'center'}}>
                  <Entypo name="google-play" size={50} color="white" />
                  <Text style={{color:Colors.textColor,textDecorationLine:'underline'}}>Google Play</Text>
                </View>
                </TouchableOpacity>
              </View>
            </View>
          }
            </View>
        </View>
        
        <Text style={{marginTop:200,color:'white'}}>ZeroHomelessInitiative</Text>

      </ScrollView>
     
    </View>
    </LinearGradient>
  
  );
}
export function About({navigation}) {
  return (
    <LinearGradient colors={['#4ca3d9', '#0600b0']} start={{x:0.34,y:0.4}} style={{ flex: 1,height:Dimensions.get('window').height,width:Dimensions.get('window').width }}>
      <ScrollView style={{flex:1,backgroundColor: isPhone() ? null : "#006FA2"}} showsVerticalScrollIndicator={false}>
        <View style={{alignSelf:'center',alignItems: isPhone() ? "flex-start" : 'center'}}>
          <Text style={{color:Colors.textColor,fontWeight:'bold',fontSize:25,marginTop:10,marginHorizontal:5,marginHorizontal:5}}>Mission</Text>
          <Text style={{color:Colors.textColor,fontSize:15,marginTop:10,maxWidth:500,marginHorizontal:5}}>Our goal is to design apps and other tools with the goal of aiding the homeless, low-income, and anyone else who is struggling. Comeback specifically is designed to help struggling individuals connect with as many possible organizations that can help them, along with distributing information that may seem irrelevant, but can be very helpful. We hope to improve your situation as much as we can.</Text>
          <Text style={{color:Colors.textColor,fontSize:15,marginTop:30,maxWidth:500,marginHorizontal:5}}>Comeback was created by Aatish Parson and Aidan Zhou</Text>
        </View>
      </ScrollView>

    </LinearGradient>
  );
}

export function Contact({navigation}) {
  return (
    <LinearGradient colors={['#4ca3d9', '#0600b0']} start={{x:0.34,y:0.4}} style={{ flex: 1,height:Dimensions.get('window').height,width:Dimensions.get('window').width }}>
      <ScrollView style={{flex:1,backgroundColor: isPhone() ? null : "#006FA2"}} showsVerticalScrollIndicator={false}>
        <View style={{alignSelf:'center',alignItems: isPhone() ? "flex-start" : 'center'}}>
          <Text style={{color:Colors.textColor,fontWeight:'bold',fontSize:25,marginTop:10,marginHorizontal:5}}>Contact Us</Text>
          <Text style={{color:Colors.textColor,fontSize:15,marginTop:10,maxWidth:500,marginHorizontal:5}}>Questions, concerns, feedback, or anything else? Please let us know!</Text>
          <TouchableOpacity style={{borderRadius:20,paddingHorizontal:30,paddingVertical:15,borderWidth:2,borderColor:'white',alignSelf:'center',marginTop:30,marginHorizontal:5}} onPress={() => MailComposer.composeAsync({recipients:["zerohomelessinitiative@gmail.com"]})}>
            <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Email Us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDescription : {
    paddingHorizontal:10,
    paddingVertical:5,
   
    justifyContent:'space-evenly',
    
  }
});

const Colors = {
  backgroundColor : "#0600b0",
  textColor: 'white'
}
