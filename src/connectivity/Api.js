import apisauce from 'apisauce';

// const create = (
//   baseURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=27.56&lon=80.70&appid=c184a8435f0903965eadf8e6048bf8df',
// ) => {
//   const api = apisauce.create({
//     baseURL,
//     timeout: 15000,
//   });

//   const getTemperature = () => {
//     return api.get();
//   };

//   return {
//     getTemperature,
//   };
// };

// export default {
//   create,
// };


function create(){

  let baseURL = "https://api.openweathermap.org"
  const api = apisauce.create({
        baseURL,
        timeout: 15000,
      });
    
      const getTemperature = (payload) => {
        let {lat, lng} = payload
        return api.get(`/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=c184a8435f0903965eadf8e6048bf8df&units=metric`);
      };
    
      return {
        getTemperature,
      };
}
export default {
    create,
  };