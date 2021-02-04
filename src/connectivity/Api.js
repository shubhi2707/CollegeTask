import apisauce from 'apisauce';

function create() {
  let baseURL = 'https://api.openweathermap.org';
  let baseURL1 = 'https://api.bigdatacloud.net';

  const api = apisauce.create({
    baseURL,
    timeout: 15000,
  });


  const cityApi = apisauce.create({
    baseURL: baseURL1,
    timeout : 15000
  })


  const getFiveDayTemperature = (payload) => {
    let {lat, lng} = payload;
    return api.get(
      `/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=c184a8435f0903965eadf8e6048bf8df&units=metric`,
    );
  };

  const getCurrentTemperature = payload =>{ 
    let {lat, lng} = payload;
    return api.get(
      `/data/2.5/weather?lat=${lat}&lon=${lng}&appid=c184a8435f0903965eadf8e6048bf8df&units=metric`,
    )
  }

  const getCurrentCityName = payload =>{ 
    let {lat, lng} = payload;
    return cityApi.get(
      `/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    )
  }


  return {
    getFiveDayTemperature,
    getCurrentTemperature,
    getCurrentCityName
  };
}
export default {
  create
};
