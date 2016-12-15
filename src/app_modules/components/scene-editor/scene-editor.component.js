
import Cell from './cell';
import ResourceMenu from './resource-menu';

export default {
    name: 'scene-editor',
    props: ['mapRef'],
    components: {
        cell: Cell,
        resourceMenu: ResourceMenu
    },
    data() {
        return {
            isEdit: false,
            currentBrush: null
        };
    },
    methods: {
        handleClick(ev, x, y) {
            if ( this.isEdit ) {
                if ( this.currentBrush ) {
                    if ( ev.button === 2 ) {
                        this.mapRef.clearBlock(x, y, this.currentBrush.blockGroup.level);
                    } else {
                        this.mapRef.createBlock(this.currentBrush, x, y);
                    }
                } else if ( ev.button === 2 ) {
                    this.mapRef.clearBlock(x, y);
                }
            }
        },
        handleBrush(brush) {
            this.currentBrush = brush;
        }
    }
};
