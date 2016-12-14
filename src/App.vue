<template src="./App.html"/>
<script>

  import components from './app_modules/components';
  import services from './app_modules/services';

  import {Map} from './app_modules/models/map.model';

  export default {
    name: 'app',
    components,
    data() {
        return {
            mapRef: null
        };
    },
    created: function () {
        this.mapRef = new Map(services.db.mapTypes.default);
        this.mapRef.setSave('default');
        this.mapRef.init()

    },
  };

</script>
