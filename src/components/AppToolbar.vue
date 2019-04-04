<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
    >
    <v-toolbar-title class="ml-0 pl-3">
    </v-toolbar-title>

 
  
  </v-toolbar>
</template>
<script>
import NotificationList from '@/components/widgets/list/NotificationList';
import Util from '@/util';
export default {
  name: 'app-toolbar',
  components: {
    NotificationList
  },
  data: () => ({
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
    }
  },
  methods: {
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    }
  }
};
</script>
