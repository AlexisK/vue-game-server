<template src="./App.html"/>
<script>

  import components from './app_modules/components';
  import services from './app_modules/services';

  import {Map} from './app_modules/models/map.model';
  import {Level} from './app_modules/models/level.model';
  import {Actor} from './app_modules/models/actor.model';
  import {Weapon} from './app_modules/models/weapon.model';

  const actorTypes = require('./instances/actor-type.js');
  const weaponTypes = require('./instances/weapon-type.js');

  export default {
    name: 'app',
    components,
    data() {
        return {
            mapRef: null,
            levelRef: null,
            serverMode: false
        };
    },
    created: function () {
        this.mapRef = new Map(services.db.mapTypes.default);
        this.mapRef.setSave('default');
        this.mapRef.init()

        this.levelRef = new Level(this.mapRef);

        let pistol = new Weapon(weaponTypes.pistol);
        let actor = new Actor(actorTypes.solider, pistol);
        console.log(actor);

        this.levelRef.registerActor(actor, 300, 300);
        this.levelRef.start();

    },
  };

</script>
