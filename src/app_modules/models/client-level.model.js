const Vue = require('vue');

export class ClientLevel {
    schema;
    ambient = '#000';

    setState(data) {
        this.schema = data.schema;
    }
}
