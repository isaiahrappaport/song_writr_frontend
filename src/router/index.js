import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import mySongs from "../views/userPage.vue";
import newSong from "../views/newSong.vue";
import rhymingGenerator from "../views/rhymingGenerator.vue";
import Record from "../views/Record.vue";
import Synth from "../views/Synth.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/mysongs", name: "mySongs", component: mySongs },
  { path: "/newsong", name: "newSong", component: newSong },
  { path: "/rhyming", name: "rhymingGenerator", component: rhymingGenerator },
  { path: "/record", name: "record", component: Record },
  { path: "/synth", name: "synth", component: Synth },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
