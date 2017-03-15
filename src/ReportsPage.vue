<template>
    <div>
        <ReportsList/>

        <v-modal v-model="modal">
            <v-btn floating="floating" slot="activator" primary dark>
              <v-icon>add</v-icon>
            </v-btn>
            <v-card>
              <v-card-text>
                <h2 class="title">Create new website report</h2>
              </v-card-text>
              <v-card-text class="subheading grey--text">
              <p>Just copy-past a website URL on the field. You will be notified once the reports as been generated. This operation could take few minutes.</p>
              <v-text-input class="mt-2" id="test2" name="test2" label="Testing 2" v-model="url" placeholder="http://google.com"></v-text-input>
              </v-card-text>
              <v-card-row actions>
                <v-spacer></v-spacer>
                <v-btn flat v-on:click.native="modal = false" class="primary--text">Cancel</v-btn>
                <v-btn flat v-on:click.native="createReport()" class="primary--text">Submit</v-btn>
              </v-card-row>
            </v-card>
        </v-modal>
    </div>
</template>

<script type="text/javascript">
    import ReportsList from './ReportsList.vue';

    export default {
        components: {
            ReportsList
        },
        data () {
            return {
                modal: false,
                url: undefined
            }
        },
        created() {
            this.fetchReportsList();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchReportsList () {
                this.$store.dispatch('fetchReportsListData');
            },
            createReport() {
                console.log("create report");
                if(this.url){
                    console.log("URL: ", this.url)
                    this.$store.dispatch('generateReport', this.url);
                }
            }
        }
        
    }
</script>