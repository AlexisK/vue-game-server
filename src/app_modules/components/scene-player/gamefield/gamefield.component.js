import Cell from './cell';
import Actor from './actor';
import Projectile from './projectile';

export default {
    name       : 'gamefield',
    components : {
        cell  : Cell,
        actor : Actor,
        projectile : Projectile,
    },
    props      : ['levelRef'],
    data() {
        return {};
    },
    methods: {
        handleMouseMove(ev) {
            let rect = this.$el.getBoundingClientRect();
            this.$emit('pointerupdate', ev.clientX - Math.round(rect.left) - 16, ev.clientY - Math.round(rect.top) - 16);
        },
        handleMouseDown(ev) {
            this.$emit('focused');
            if ( ev.button === 2 ) {
                this.$emit('pointerrightdown');
            } else {
                this.$emit('pointerleftdown');
            }
        },
        handleMouseUp(ev) {
            this.$emit('focused');
            if ( ev.button === 2 ) {
                this.$emit('pointerrightup');
            } else {
                this.$emit('pointerleftup');
            }
        }
    }
};
