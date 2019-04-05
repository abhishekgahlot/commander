<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-list>
          <v-list-tile
            v-for="item in processList"
            :key="item.id"
            avatar
            :href="'show/'+item.id"
            @click=""
          >
            <v-list-tile-content>
              <v-list-tile-title v-text="item.command"></v-list-tile-title>
            </v-list-tile-content>

              {{ item.id }}
          </v-list-tile>
        </v-list>
    </v-container>
  </div>
</template>

<script>
import API from '@/api';
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
    PlainTableOrder    
  },
  data: () => ({
    color: Material,
    selectedTab: 'tab-1',
    processList: []
  }),
  mounted() {
    axios({ method: "GET", "url": "/getall" }).then(result => {
        this.processList = result.data.data;
    }, error => {
        console.error(error);
    });
  },
  computed: {
    activity () {
      return API.getActivity();
    },
    posts () {
      return API.getPost(3);
    },
    siteTrafficData () {
      return API.getMonthVisit;
    },
    locationData () {
      return API.getLocation;
    }
  },

};
</script>
