import React from 'react'
import Discover from "../pages/discover";
import Mine from "../pages/mine";
import Friend from "../pages/friend";
import {
  Redirect
} from "react-router-dom"
import Recommend from '@/pages/discover/c-pages/recommend';
import Ranking from '@/pages/discover/c-pages/ranking';
import Songs from '@/pages/discover/c-pages/songs';
import DjRadio from '@/pages/discover/c-pages/songs';
import Artist from '@/pages/discover/c-pages/artist';
import Album from '@/pages/discover/c-pages/album';

const routes = [{
    path: "/",
    exact: true,
    component: Discover,
    render: () => ( <
      Redirect to = "/discover" / >
    )
  },

  {
    path: "/discover",
    component: Discover,
    routes: [{
        path: "/discover",
        exact: true,
        render: () => ( <
          Redirect to = "/discover/recommend" / >
        )
      },
      {
        path: "/discover/recommend",
        component:Recommend
      },
      {
        path: "/discover/ranking",
        component: Ranking
      },
      {
        path: "/discover/songs",
        component: Songs
      },
      {
        path: "/discover/djradio",
        exact: true,
        component: DjRadio
      },
      {
        path: "/discover/artist",
        component: Artist
      },
      {
        path: "/discover/album",
        component: Album
      },
      // {
      //   path: "/discover/player",
      //   component: Player
      // }
    ]
  },

  {
    path: "/mine",
    component: Mine,
  },

  {
    path: "/friend",
    component: Friend,
  },
];

export default routes;