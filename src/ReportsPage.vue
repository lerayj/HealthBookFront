<template>
    <div>
        <h1>Reports</h1>
        <ReportsList/>
    </div>
</template>

<script type="text/javascript">
    import ReportsList from './ReportsList.vue';

    export default {
        components: {
            ReportsList
        },
        created() {
            console.log("Created");
            this.fetchReportsList();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchReportsList () {
                this.$store.dispatch('fetchReportsListData');
            }
        }
        
    }
</script>