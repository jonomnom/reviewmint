import { useQuery } from '@apollo/client';
import SinglePublication from '@components/Publication/SinglePublication';
import PublicationsShimmer from '@components/Shared/Shimmer/PublicationsShimmer';
import { Card } from '@components/UI/Card';
import { EmptyState } from '@components/UI/EmptyState';
import { ErrorMessage } from '@components/UI/ErrorMessage';
import InfiniteLoader from '@components/UI/InfiniteLoader';
import type { LensterPublication } from '@generated/lenstertypes';
import type { Profile } from '@generated/types';
import { ProfileFeedDocument, PublicationMainFocus, PublicationTypes } from '@generated/types';
import { CollectionIcon } from '@heroicons/react/outline';
import { FC, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SCROLL_THRESHOLD } from 'src/constants';
import { useAppStore } from 'src/store/app';
import SingleStat from './SingleStat';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import SingleReview from './SingleReview';
import Stars from './Stars';
interface Props {
  profile: Profile;
}

const Stats: FC<Props> = ({ profile }) => {
  const parent = useAutoAnimate(/* optional config */);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [skillSelected, setSkillSelected] = useState<number>();
  const stats = [
    {
      category: 'exp',
      description:
        'I have been doing web development for 2 years. I got into crypto 1 year ago. I am the cofounder of Clipto and AmpliFi.'
    },
    {
      category: 'edu',
      description: 'I graduated UC Berkeley with a BS in Molecular Biology'
    }
  ];
  const skills = [
    {
      title: 'HTML',
      reviews: [
        { title: 'Best designer ever', score: 1, description: 'HTML Does awesome work!' },
        { title: 'Best designer ever', score: 4, description: 'This person Does awesome work!' }
      ],
      totalNumOfReviews: 100,
      score: 1
    },
    {
      title: 'CSS',
      reviews: [
        { title: 'Best designer ever', score: 2, description: 'I love his design work. Does awesome work!' },
        {
          title: 'Best designer ever',
          score: 3,
          description: 'He knows CSS like the back of his hand. Does awesome work!'
        }
      ],
      totalNumOfReviews: 10,
      score: 3
    },
    {
      title: 'React',
      reviews: [
        { title: 'Best designer ever', score: 3, description: 'React wizard. Does awesome work!' },
        { title: 'Best designer ever', score: 1, description: 'Decent at React. Does awesome work!' }
      ],
      totalNumOfReviews: 31,
      score: 4
    },
    {
      title: 'Next',
      reviews: [
        {
          title: 'Best designer ever',
          score: 6,
          description: 'Was very fast to learn Next. Does awesome work!'
        },
        { title: 'Best designer ever', score: 6, description: 'When next? Does awesome work!' }
      ],
      totalNumOfReviews: 9,
      score: 1
    }
  ];

  return (
    <>
      <div className="flex justify-between gap-4">
        <Card className="divide-y-[1px] dark:divide-gray-700/80">
          {stats?.map((stats, index: number) => (
            <SingleStat
              key={`${stats.category}_${index}`}
              title={stats.category}
              description={stats.description}
            />
          ))}
          {skills?.map((skill, i) => (
            <div
              className={`p-5 hover:bg-gray-100 cursor-pointer ${i === skillSelected && 'bg-gray-100'}`}
              onClick={() => {
                if (skillSelected === i) {
                  setSkillSelected(undefined);
                } else {
                  setSkillSelected(i);
                }
              }}
            >
              <div className="flex justify-between">
                <div className="my-2">{skill.title} </div>
                <Stars number={skill.score} />
                <div className="my-2 text-slate-500">{skill.totalNumOfReviews} Reviews</div>
              </div>
            </div>
          ))}
        </Card>
        {skillSelected !== undefined && (
          <Card className="divide-y-[1px] dark:divide-gray-700/80 w-full">
            {' '}
            {skills[skillSelected]?.reviews.map((review, index: number) => (
              <SingleReview
                key={`${review.title}_${index}`}
                title={review.title}
                description={review.description}
                rating={review.score}
              />
            ))}
          </Card>
        )}
      </div>
    </>
  );
};

export default Stats;
