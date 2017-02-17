<template>
    <div>
    <GraphChart/>
    <v-card>
        <v-card-row class="green darken-1">
            <v-card-title>
                <span class="white--text">Marriot Rewards</span>
                <v-spacer></v-spacer>
            </v-card-title>
        </v-card-row>
        <v-card-row>
            <v-card-text>
            <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            </v-card-text>
        </v-card-row>
    </v-card>
    </div>
</template>

<script type="text/javascript">
    import GraphChart from './GraphChart.vue';

    export default {
        components: {
            GraphChart
        }
    }
</script>