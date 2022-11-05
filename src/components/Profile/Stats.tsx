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
import { ChatAlt2Icon, CollectionIcon } from '@heroicons/react/outline';
import { FC, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SCROLL_THRESHOLD } from 'src/constants';
import { useAppStore } from 'src/store/app';
import SingleStat from './SingleStat';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import SingleReview from './SingleReview';
import Stars from './Stars';
import { Button } from '@components/UI/Button';
import { Spinner } from '@components/UI/Spinner';
import { Modal } from '@components/UI/Modal';
import CollectModule from '@components/Publication/Actions/Collect/CollectModule';
import NewComment from '@components/Composer/Comment/New';
interface Props {
  profile: Profile;
}

const Stats: FC<Props> = ({ profile }) => {
  const parent = useAutoAnimate(/* optional config */);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [skillSelected, setSkillSelected] = useState<number>();
  const [showAddReviewModal, setShowAddReviewModal] = useState<number>();
  const stats = [
    {
      category: 'Experience',
      description:
        'I have been doing web development for 2 years. I got into crypto 1 year ago. I am the cofounder of Clipto and AmpliFi.'
    },
    {
      category: 'Education',
      description: 'I graduated UC Berkeley with a BS in Molecular Biology'
    }
  ];
  const skills = [
    {
      title: 'HTML',
      reviews: [
        {
          lensHandle: 'aaveaave.lens',
          profileUrl:
            'https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/QmeG11YaqCAirSXPhiN6qLNDqMsnED8WLJLgv2bhtE3QaS',
          title: 'Best designer ever',
          score: 1,
          description: 'HTML Does awesome work!'
        },
        {
          lensHandle: 'aaveaave.lens',
          profileUrl:
            'https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/QmeG11YaqCAirSXPhiN6qLNDqMsnED8WLJLgv2bhtE3QaS',
          title: 'Best designer ever',
          score: 4,
          description: 'This person Does awesome work!'
        },
        {
          lensHandle: 'aaveaave.lens',
          profileUrl:
            'https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/QmeG11YaqCAirSXPhiN6qLNDqMsnED8WLJLgv2bhtE3QaS',
          title: 'Best designer ever',
          score: 1,
          description: 'HTML Does awesome work!'
        }
      ],
      totalNumOfReviews: 100,
      score: 1
    },
    {
      title: 'CSS',
      reviews: [
        {
          lensHandle: 'aaveaave.lens',
          profileUrl:
            'https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/QmeG11YaqCAirSXPhiN6qLNDqMsnED8WLJLgv2bhtE3QaS',
          title: 'Best designer ever',
          score: 2,
          description: 'I love his design work. Does awesome work!'
        },
        {
          lensHandle: 'aaveaave.lens',
          profileUrl:
            'https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/QmeG11YaqCAirSXPhiN6qLNDqMsnED8WLJLgv2bhtE3QaS',
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
        {
          lensHandle: 'aaveaave.lens',
          profileUrl:
            'https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/QmeG11YaqCAirSXPhiN6qLNDqMsnED8WLJLgv2bhtE3QaS',
          title: 'Best designer ever',
          score: 3,
          description: 'React wizard. Does awesome work!'
        },
        {
          lensHandle: 'aaveaave.lens',
          profileUrl:
            'https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/QmeG11YaqCAirSXPhiN6qLNDqMsnED8WLJLgv2bhtE3QaS',
          title: 'Best designer ever',
          score: 1,
          description: 'Decent at React. Does awesome work!'
        }
      ],
      totalNumOfReviews: 31,
      score: 4
    },
    {
      title: 'Next',
      reviews: [
        {
          lensHandle: 'aaveaave.lens',
          profileUrl:
            'https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/QmeG11YaqCAirSXPhiN6qLNDqMsnED8WLJLgv2bhtE3QaS',
          title: 'Best designer ever',
          score: 6,
          description: 'Was very fast to learn Next. Does awesome work!'
        },
        {
          lensHandle: 'aaveaave.lens',
          profileUrl:
            'https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/QmeG11YaqCAirSXPhiN6qLNDqMsnED8WLJLgv2bhtE3QaS',
          title: 'Best designer ever',
          score: 6,
          description: 'When next? Does awesome work!'
        }
      ],
      totalNumOfReviews: 9,
      score: 1
    }
  ];
  const reviewer = true;
  const isLoading = false;
  const reviewCompleted = false;
  const addReview = () => {};

  return (
    <>
      <Modal onClose={() => setSkillSelected(undefined)} show={skillSelected !== undefined} title={'Review'}>
        {/* <CollectModule count={'1-1'} publication={'A' as any} setCount={1 as any} /> */}
        <NewComment publication={'0x1c19-0x64' as any} />
      </Modal>
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
                {reviewer && typeof skillSelected !== 'number' ? (
                  <Button
                    disabled={isLoading || reviewCompleted}
                    icon={isLoading ? <Spinner size="xs" /> : <ChatAlt2Icon className="w-4 h-4" />}
                    onClick={() => setShowAddReviewModal(skillSelected)}
                  >
                    {reviewCompleted ? 'Review Completed' : 'Add Review'}
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
        </Card>
        {skillSelected !== undefined && (
          <div className="w-full">
            <InfiniteScroll
              dataLength={100}
              hasMore={true}
              next={async () => {
                return new Promise((resolve) =>
                  setTimeout(() => {
                    resolve({
                      data: [
                        ...skills[skillSelected]?.reviews,
                        {
                          title: 'Best designer ever',
                          score: 3,
                          description: 'React wizard. Does awesome work!'
                        },
                        {
                          title: 'Best designer ever',
                          score: 1,
                          description: 'Decent at React. Does awesome work!'
                        }
                      ]
                    });
                  }, 300)
                );
              }}
              loader={null && <InfiniteLoader />}
              scrollThreshold={0.5}
              className="w-full"
            >
              <Card className="divide-y-[1px] dark:divide-gray-700/80 w-full">
                {' '}
                {skills[skillSelected]?.reviews.map((review, index: number) => (
                  <SingleReview
                    key={`${review.title}_${index}`}
                    lensHandle={review.lensHandle}
                    profileUrl={review.profileUrl}
                    title={review.title}
                    description={review.description}
                    rating={review.score}
                  />
                ))}
              </Card>
            </InfiniteScroll>
          </div>
        )}
      </div>
    </>
  );
};

export default Stats;
