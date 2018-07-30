const crudTypes = ["post", "fetch", "update", "delete"];
const asyncTypes = ["request", "success", "failure"];

const capitalize = str => str[0].toUpperCase() + str.slice(1).toLowerCase();
String.prototype.toCapitalCase = function() {
  return capitalize(this);
};

export const typeStringCreator = typeVar =>
  typeVar.split("_").reduce((ret, curr) => `${ret}/${curr}`);

export const typeCreator = (namespace, resources) => {
  return (resource, crudType, asyncType) => {
    try {
      if (
        resources.indexOf(resource) < 0 ||
        crudTypes.indexOf(crudType) < 0 ||
        asyncTypes.indexOf(asyncType) < 0
      ) {
        throw new Error();
      }
      resource = resource.toUpperCase();
      crudType = crudType.toUpperCase();
      asyncType = asyncType.toUpperCase();
      namespace = namespace.toUpperCase();
      return `${namespace}/${resource}/${crudType}/${asyncType}`;
    } catch (e) {
      console.error("Check resource, crud, or async name.");
      console.trace();
    }
  };
};

export const actionCreator = (types, namespace, resources) => {
  let actions = {};
  resources.map(r =>
    asyncTypes.map(at =>
      crudTypes.map(ac => {
        const type = `${r.toUpperCase()}_${ac.toUpperCase()}_${at.toUpperCase()}`;

        ac = ac[0].toUpperCase() + ac.slice(1);
        at = at[0].toUpperCase() + at.slice(1);
        r = r[0].toUpperCase() + r.slice(1);
        const CAMEL = `${namespace}${r}${ac}${at}`;

        Object.assign(actions, {
          get [CAMEL]() {
            return payload => {
              return {
                type: types[type],
                payload
              };
            };
          }
        });
      })
    )
  );
  return actions;
};

// export const creator = (namespace, resources) => {
//     const types = typeCreator(namespace, resources);
//     const actions = actionCreator(types, namespace, resources);
//     return {types, actions};
// }

//
// class ActionCreator {
//
//     static instance;
//     constructor(){
//         if(instance){
//             return instance;
//         }
//         this.types = {};
//         this.actions = {};
//         instance = this;
//     }
//
//     /**
//      *
//      * @param {string} namespace
//      * @param {Object} schema
//      */
//     enroll(namespace, schema){
//         let resources = [];
//         for(let key in schema){
//             if(schema.hasOwnProperty(key)){
//                 resources.push(key);
//             }
//         }
//
//
//         this.actions[namespace] = {};
//         this.types[namespace] = {};
//         resources.forEach(resource => {
//             crudTypes.forEach(ct => {
//                 asyncTypes.forEach(at => {
//                     let typeStr = `${namespace.toUpperCase()}/${resource.toUpperCase()}/${ct.toUpperCase()}/${at.toUpperCase()}`;
//                     this.types[namespace] = {
//                         ...this.types[namespace],
//                         [resource.toUpperCase()]: {
//                             ...this.types[namespace][resource.toUpperCase()],
//                             [ct.toUpperCase()]:{
//                                 ...this.types[namespace][resource.toUpperCase()][ct.toUpperCase()],
//                                 [at.toUpperCase()]: typeStr
//                             }
//                         }
//                     }
//                     this.actions[namespace] = {
//                         ...this.actions[namespace],
//                         [resource.toCapitalCase()]: {
//                             ...this.actions[namespace][resource.toUpperCase()],
//                             [ct.toCapitalCase()]:{
//                                 ...this.actions[namespace][resource.toUpperCase()][ct.toUpperCase()],
//                                 [at.toCapitalCase()]: (payload) => {
//                                     try{
//                                         schema[]
//                                         payload.hasOwnProperty()
//                                     }
//
//                                 }
//                             }
//                         }
//                     }
//                 })
//             })
//
//
//         })
//
//
//
//         this.types = {
//             ...this.types,
//             [namespace]: typeCreator(namespace, resources)
//         };
//
//     }
// }
//
// export default new ActionCreator()
