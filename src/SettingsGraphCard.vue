<template>
    <v-card>
        <v-card-text>
            <h4>Settings</h4>
            <v-card-row height="75px">
            <v-col xs6="xs6">
                <v-select v-model="nodeSize" v-bind:options="nodeSizeOptions" label="Node size" defaultText="Set node size"></v-select>
            </v-col>
            <v-col xs6="xs6">
                <v-select v-model="linkThick" v-bind:options="linkThickOptions" label="Link thickness" defaultText="Set link thickness"></v-select>
            </v-col>
            <v-col xs6="xs6">
                <v-select v-model="nodeColor" v-bind:options="nodeColorOptions" label="Node color" defaultText="Set node color"></v-select>
            </v-col>
            </v-card-row>
        </v-card-text>
    </v-card>
</template>

<script type="text/javascript">
    import { NODE_SIZE_OPTIONS as NODE_SIZE, 
        LINK_THICK_OPTIONS as LINK_THICK,
        NODE_COLOR_OPTIONS as NODE_COLOR } from './globalsEnums.js';

    export default {
        data() {
            return {
                nodeSize: {id: NODE_SIZE.COOKIES, text: 'Cookies'},
                linkThick: undefined,
                nodeColor: undefined,
                nodeSizeOptions: [{id: NODE_SIZE.COOKIES, text: 'Cookies'}, {id: NODE_SIZE.DATA, text: 'Data'}],
                linkThickOptions: [{id: LINK_THICK.COOKIES, text: 'Cookies'}, {id: LINK_THICK.CALLS, text: 'Calls'}],
                nodeColorOptions: [{id: NODE_COLOR.COOKIES, text: 'Cookies'}, {id: NODE_COLOR.CATEGORIES, text: 'Categories'}]
            }
        }
    }
</script>

<style type="text/css">
    
</style>