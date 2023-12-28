import AsyncStorage from "@react-native-async-storage/async-storage";
import { readOnlineApi } from "./ReadPostApi";
import {writePostApi} from './writePostApi'
import Geocoder from "react-native-geocoder";
const GLOBAL = require("./Global");
const Api = require("./Api");
let obj2=''
let obj3=''
let i = 0;
let id=0;
let count=''
Geocoder.fallbackToGoogle('AIzaSyBv7qilelWW181590KkUizFqj4WcY2P1k0');
export async function syncLocalStorageToServer()
{
  const  syncLocalStorageToServerURL = async (url) => {
    try{
       count = await readDataStorage(url);
      let i = 0;
      let loopCount = 0;
      if(count != null && count != undefined)
      {
        if(parseInt(count?.length) > 0)
        {
          for(i=0;i <= parseInt(count?.length); i++)
          {
            let obj =count?.[i]
            if(obj.Url!==Api.AddBuildNotes) {
               obj2 = obj?.formdata._parts;
              id = obj?.id;
              if (obj.Url === Api.CreateUnit || obj.Url === Api.CreateSite) {
                var formdata = new FormData();
                let Address = ''
                let geoLat = ''
                let geoLong = ''
                for (let j = 0; j < obj2?.length; j++) {
                   obj3 = obj2[j];
                  if (obj3?.[0] !== 'geoAddress') {
                    formdata.append(obj3?.[0], obj3?.[1]);
                  }
                  if (obj3?.[0] === 'geoLat') {
                    geoLat = obj3?.[1]
                  }
                  if (obj3?.[0] === 'geoLong') {
                    geoLong = obj3?.[1]
                  } else if (obj3?.[0] === 'geoAddress') {
                    var NY = {
                      lat: geoLat,
                      lng: geoLong
                    }
                    await Geocoder.geocodePosition(NY).then(res => {
                      Address = res?.[0]?.formattedAddress
                    })
                    formdata.append('geoAddress', Address);
                  }
                }
                let returnData = await writePostApi(obj.type, obj.Url, formdata)
                if(returnData != undefined)
                {
                  if(returnData.status === true)
                  {
                    removeItemValue(id);
                    getAllProjectInfo()

                  }
                }
              }
              else if(obj.Url === Api.AddTask){
                obj2 = obj?.formdata._parts;
                id = obj?.id;
                if(obj?.ImageSourceviewarrayUpload){
                  var formdata = new FormData();
                  for (let j = 0; j < obj2?.length; j++) {
                    obj3 = obj2[j];
                    if(obj3?.[0]!=='attachments[]')
                    {
                      formdata.append(obj3?.[0], obj3?.[1]);
                    }
                  }

                  for (let i = 0; i < obj?.ImageSourceviewarrayUpload?.length; i++) {
                    let idsArray = obj?.ImageSourceviewarrayUpload[i];
                    formdata.append("attachments[]", {
                      uri:idsArray.uri,
                      type:idsArray.type,
                      name:idsArray.fileName,
                    });
                    console.log(formdata,'formdata')
                    console.log(obj.type, obj.Url,'obj.type, obj.Url')
                    let returnData = await writePostApi(obj.type, obj.Url, formdata)

                    if(returnData != undefined)
                    {
console.log(returnData,'returnData')
                      if(returnData.status === true)
                      {
                        removeItemValue(id);
                        My_TaskList()
                      }
                    }
                  }
                }
                else {
                  var formdata = new FormData();
                  for (let j = 0; j < obj2?.length; j++) {
                    obj3 = obj2[j];
                    formdata.append(obj3?.[0], obj3?.[1]);
                  }

                  let returnData = await writePostApi(obj.type, obj.Url, formdata);
                  if(returnData != undefined)
                  {

                    if(returnData.status === true)
                    {
                      removeItemValue(id);
                      My_TaskList()
                    }
                  }
                }
              }
              else {
                var formdata = new FormData();
                for (let j = 0; j < obj2?.length; j++) {
                   obj3 = obj2[j];
                  formdata.append(obj3?.[0], obj3?.[1]);
                }
                let returnData = await writePostApi(obj.type, obj.Url, formdata);
                if(returnData != undefined)
                {
                  if(returnData.status === true)
                  {
                    removeItemValue(id);
                    getAllProjectInfo()
                  }
                }
              }
            }
            else {
              obj2 = obj?.formdata._parts;
              id = obj?.id;
              if(obj?.ImageSourceviewarrayUpload){
                var formdata = new FormData();
                let Address = ''
                let geoLat = ''
                let geoLong = ''
                for (let j = 0; j < obj2?.length;j++) {
                   obj3 = obj2[j];
                  if (obj3?.[0] === 'geoLat') {
                    geoLat = obj3?.[1]
                  }
                  if (obj3?.[0] === 'geoLong') {
                    geoLong = obj3?.[1]
                  }
                  if(obj3?.[0]!=='attachment'&&obj3?.[0]!=='postDate')
                    if (obj3?.[0] !== 'geoAddress') {
                      formdata.append(obj3?.[0], obj3?.[1]);
                    }
                    else if (obj3?.[0] === 'geoAddress') {
                      var NY = {
                        lat: geoLat,
                        lng: geoLong
                      }
                      await Geocoder.geocodePosition(NY).then(res => {
                        Address = res?.[0]?.formattedAddress
                      })
                      formdata.append('geoAddress', Address);
                    }
                }

                for (let i = 0; i < obj?.ImageSourceviewarrayUpload?.length; i++) {
                  let idsArray = obj?.ImageSourceviewarrayUpload[i];
                  formdata.append("attachment", {
                    uri:idsArray.uri,
                    type:idsArray.type,
                    name:idsArray.fileName,
                  });
                  formdata.append("postDate", idsArray.Date);
                  let returnData = await writePostApi(obj.type, obj.Url, formdata)
                  if(returnData != undefined)
                  {

                    if(returnData.status === true)
                    {

                      removeItemValue(id);
                    }
                  }
                }
              }
              else {
                var formdata = new FormData();
                for (let j = 0; j < obj2?.length; j++) {
                   obj3 = obj2[j];
                  formdata.append(obj3?.[0], obj3?.[1]);
                }

                fetch(GLOBAL.OrgAppLink_value +obj.Url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                  body: formdata,
                })
                  .then(resp => {

                    if (resp.status === 201) {
                      removeItemValue(id);
                    }
                    return resp.txt();
                  })
                  .then(txt => {

                  })
                  .catch(error => console.log("errorwwww", error));
              }

            }
          }
        }
      }
      /*
      * ASYNC SALES INVOICE END HERE
      */
      return loopCount;
    }
    catch(error){

      //alert('Error: Okout User:'+error);
    }

  };
  const getAllProjectInfo = async () => {
      readOnlineApi(Api.getAllProjectInfo).then(json => {
        GLOBAL.AllProjectInfo=json?.projects
        writeDataStorage(GLOBAL.All_Lists, json?.projects);
      });
  };
  const My_TaskList =async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.My_TaskList+`userId=1`).then(json => {
        writeDataStorage(GLOBAL.All_Task,json?.tasks)
      });
    }
  };
  const readDataStorage=async (key)=> {
  try{
    let storeObj = await AsyncStorage.getItem(key);
    let obj = JSON.parse(storeObj);
    return obj;

  }
  catch(error){
    this.setState({ loadingVisible: false});
    alert('try readWriteApi:readDataStorage'+ JSON.stringify(error));
    //alert('readDataStorage:'+error);
  }
};
  const  writeDataStorage=async (key, obj)=>{
    try {
      await AsyncStorage.setItem(key, JSON.stringify(obj));
    } catch (e) {
    }
  }
  const  removeItemValue=async (id)=> {
    let  get_MethodsList = await readDataStorage(GLOBAL.offline_data);
    console.log(get_MethodsList,'removeItemValue')
    let index = get_MethodsList.findIndex((p) => p.id === id);
    let markers = [...get_MethodsList];
    markers.splice(index, 1);
    console.log(markers,'removeItemValue:markers')
    await writeDataStorage(GLOBAL.offline_data,markers)
  }
  try{
    await syncLocalStorageToServerURL(GLOBAL.offline_data);
  }
  catch(error){
  }
}
