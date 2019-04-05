<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
    >
    <v-toolbar-title class="ml-0 pl-3">
    </v-toolbar-title>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Run Command</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Run Command</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>
                <v-text-field label="Add Command to Run" v-model="command" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="sendCommand">Run</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </v-toolbar>
</template>
<script>
import NotificationList from '@/components/widgets/list/NotificationList';
import Util from '@/util';
import axios from "axios";

export default {
  name: 'app-toolbar',
  components: {
    NotificationList
  },
  data: () => ({
    dialog: false,
    command: "curl google.com",
    items: [
      {
        icon: 'account_circle',
        href: '#',
        title: 'Profile',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'settings',
        href: '#',
        title: 'Settings',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'fullscreen_exit',
        href: '#',
        title: 'Logout',
        click: (e) => {
          window.getApp.$emit('APP_LOGOUT');
        }
      }
    ],
  }),
  computed: {
    toolbarColor () {
      return this.$vuetify.options.extra.mainNav;
    },
  },
  methods: {
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    },
    sendCommand() {
      console.log(this.command)
      axios({ method: "GET", "url": "/run/" + this.command }).then(result => {
          this.data = JSON.parse(result.data.data);
          window.location.pathname = '/show/' + this.data;
        }, error => {
            console.error(error);
        });
    }
  }
};
</script>
