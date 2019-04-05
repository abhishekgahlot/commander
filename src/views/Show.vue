<template>
  <div id="pageShow">
    <v-container grid-list-xl fluid>
      <h3>Logs for {{ uuid }}</h3>
      <h4>Command Executed: {{ currentCommand }}</h4>
      <Prism language="javascript" >{{ data }}</Prism>
    </v-container>
  </div>
</template>

<script>
import API from '@/api';
import 'prismjs'
import 'prismjs/themes/prism.css'
import Prism from 'vue-prism-component'
import axios from "axios";
import EChart from '@/components/chart/echart';
import MiniStatistic from '@/components/widgets/statistic/MiniStatistic';
import PostListCard from '@/components/widgets/card/PostListCard';
import ProfileCard from '@/components/widgets/card/ProfileCard';
import PostSingleCard from '@/components/widgets/card/PostSingleCard';
import WeatherCard from '@/components/widgets/card/WeatherCard';
import PlainTable from '@/components/widgets/list/PlainTable';
import PlainTableOrder from '@/components/widgets/list/PlainTableOrder';
import VWidget from '@/components/VWidget';
import Material from 'vuetify/es5/util/colors';
import VCircle from '@/components/circle/VCircle';
import BoxChart from '@/components/widgets/chart/BoxChart';
import ChatWindow from '@/components/chat/ChatWindow';
import CircleStatistic from '@/components/widgets/statistic/CircleStatistic';
import LinearStatistic from '@/components/widgets/statistic/LinearStatistic';
export default {
  components: {
    VWidget,
    MiniStatistic,
    ChatWindow,
    VCircle,
    WeatherCard,
    PostSingleCard,
    PostListCard,
    ProfileCard,
    EChart,
    BoxChart,
    CircleStatistic,
    LinearStatistic,
    PlainTable,
    PlainTableOrder,
    Prism
  },
  data: () => ({
    uuid: "",
    data: "Loading...",
    currentCommand: "Loading..."
  }),
  mounted() {
    this.fetchLogs()
  },

  methods: {
    fetchLogs() {
      axios({ method: "GET", "url": "/getall" }).then(result => {
          this.processList = result.data.data;
          this.currentCommand = this.processList.filter(i => i.id ===  window.location.pathname.split('/').pop())[0].command;
      }, error => {
          console.error(error);
      });
      setInterval(() => {
        this.uuid = window.location.pathname.split('/').pop();
        axios({ method: "GET", "url": "/get/" + this.uuid }).then(result => {
            this.data = JSON.parse(result.data.data);
        }, error => {
            console.error(error);
        });
      }, 5000);
    }
  },
  computed: {
    
  },

};
</script>
