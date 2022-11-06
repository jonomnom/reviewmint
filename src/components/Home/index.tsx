import NewPost from '@components/Composer/Post/New';
import ExploreFeed from '@components/Explore/Feed';
import BetaWarning from '@components/Home/BetaWarning';
import Footer from '@components/Shared/Footer';
import Search from '@components/Shared/Navbar/Search';
import { GridItemEight, GridItemFour, GridLayout } from '@components/UI/GridLayout';
import MetaTags from '@components/utils/MetaTags';
import isFeatureEnabled from '@lib/isFeatureEnabled';
import type { NextPage } from 'next';
import { useState } from 'react';
import { useAppStore } from 'src/store/app';

import EnableDispatcher from './EnableDispatcher';
import EnableMessages from './EnableMessages';
import FeedType from './FeedType';
import Hero from './Hero';
import Highlights from './Highlights';
import RecommendedProfiles from './RecommendedProfiles';
import SetDefaultProfile from './SetDefaultProfile';
import SetProfile from './SetProfile';
import Timeline from './Timeline';
import Trending from './Trending';

const Home: NextPage = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [feedType, setFeedType] = useState<'TIMELINE' | 'HIGHLIGHTS'>('TIMELINE');

  return (
    <>
      <MetaTags />
      {!currentProfile && <Hero />}
      <GridLayout>
        <GridItemEight className="space-y-5">
          <div>Start by searching for profiles in the search. {`(ex: jon169.test)`}</div>
          <div>Or you can go to your profile after you login to create your own profile with your skills</div>
        </GridItemEight>
      </GridLayout>
    </>
  );
};

export default Home;
