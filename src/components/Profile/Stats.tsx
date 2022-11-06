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
import { FC, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SCROLL_THRESHOLD } from 'src/constants';
import { useAppStore } from 'src/store/app';
import SingleStat from './SingleStat';
import onError from '@lib/onError';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import SingleReview from './SingleReview';
import Stars from './Stars';
import { Button } from '@components/UI/Button';
import { Spinner } from '@components/UI/Spinner';
import { Modal } from '@components/UI/Modal';
import CollectModule from '@components/Publication/Actions/Collect/CollectModule';
import NewComment from '@components/Composer/Comment/New';
import getAttribute from '@lib/getAttribute';
import NewReview from './NewReview';
import NewSkill from './NewSkills';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { Input } from '@components/UI/Input';
import { useContractWrite } from 'wagmi';
import ABI from '../../../thegraph/abis/Contract.json';
interface Props {
  profile: Profile;
}

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/jonomnom/reviewmint',
  cache: new InMemoryCache()
});

const Stats: FC<Props> = ({ profile }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const parent = useAutoAnimate(/* optional config */);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [skillSelected, setSkillSelected] = useState<string>();
  const [showAddReviewModal, setShowAddReviewModal] = useState<boolean>(false);
  const [skills, setSkills] = useState<Array<any>>();
  const [reviews, setReviews] = useState<Array<any>>();
  const {
    error,
    isLoading: writeLoading,
    write
  } = useContractWrite({
    address: '0x0E5A55592bFa892a5c68c1f89260EDa7006E1165',
    abi: ABI,
    functionName: 'setPhone',
    mode: 'recklesslyUnprepared',
    onSuccess: ({ hash }) => {
      console.log(hash);
    },
    onError
  });

  const addPh = async () => {
    write?.({
      recklesslySetUnpreparedArgs: [phoneNumber]
    });
  };
  useEffect(() => {
    if (!client) return;
    if (!profile.ownedBy) return;
    const querySubscription = client
      .watchQuery({
        query: gql`
        query getSkills{
          skills(where: { account: "${profile.ownedBy.toLowerCase()}" }, first: 4) {
            account
            totalRatings
            skill
            NumOfRatings
            id
          }
        }
      `,
        pollInterval: 5000,

        fetchPolicy: 'cache-and-network'
      })
      .subscribe((res) => {
        setSkills(res.data && res.data.skills);
      });
    return () => {
      querySubscription.unsubscribe();
    };
  }, [client, profile.ownedBy]);

  useEffect(() => {
    if (!client) return;
    if (!profile.ownedBy) return;
    if (!skills) return;
    setReviews(undefined);
    const querySubscription = client
      .watchQuery({
        query: gql`
        query getReviews{
          reviews (where: {skill_: {
            id: "${skillSelected}"
          }}){
            description
            rating
            reviewee
            id
            skill {
              id
              skill
            }
          }
        }
      `,
        pollInterval: 5000,
        fetchPolicy: 'cache-and-network'
      })
      .subscribe((res) => {
        console.log(res);
        setReviews(res.data && res.data.reviews);
      });
    return () => {
      querySubscription.unsubscribe();
    };
  }, [client, profile.ownedBy, skills, skillSelected]);

  const stats = [
    {
      category: 'Experience',
      description: getAttribute(profile?.attributes, 'experience')
    },
    {
      category: 'Education',
      description: getAttribute(profile?.attributes, 'education')
    }
  ];
  const [f, a] = useState('');
  const skills1 = [
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
  const reviewer = currentProfile?.id !== profile?.id;
  const isLoading = false;
  const reviewCompleted = false;
  const addReview = () => {};
  return (
    <>
      {skills && skills.length > 0 && reviewer ? (
        <Button
          disabled={isLoading || reviewCompleted}
          icon={isLoading ? <Spinner size="xs" /> : <ChatAlt2Icon className="w-4 h-4" />}
          onClick={() => setShowAddReviewModal(true)}
        >
          {'Add Review'}
        </Button>
      ) : skills && skills.length === 0 && !reviewer ? (
        <>
          <Button
            disabled={isLoading || reviewCompleted}
            icon={isLoading ? <Spinner size="xs" /> : <ChatAlt2Icon className="w-4 h-4" />}
            onClick={() => setShowAddReviewModal(true)}
          >
            {'Add Skills'}
          </Button>
        </>
      ) : !reviewer && skills && skills.length > 0 ? (
        <div>
          <Input onChange={(e) => setPhoneNumber(e.target.value)} placeholder={'Add phone number'} />
          <Button
            disabled={isLoading || reviewCompleted}
            icon={isLoading ? <Spinner size="xs" /> : <ChatAlt2Icon className="w-4 h-4" />}
            onClick={() => phoneNumber && addPh(phoneNumber)}
          >
            {'Add Phone Number to receive SMS notifications'}
          </Button>
        </div>
      ) : null}
      {true ? (
        <Modal onClose={() => setShowAddReviewModal(false)} show={showAddReviewModal} title={'Review'}>
          {/* <CollectModule count={'1-1'} publication={'A' as any} setCount={1 as any} /> */}
          {reviewer && skills ? (
            <NewReview profile={profile} setShowAddReviewModal={setShowAddReviewModal} skills={skills} />
          ) : (
            <NewSkill
              profile={currentProfile as Profile}
              setShowAddReviewModal={setShowAddReviewModal}
            ></NewSkill>
          )}
        </Modal>
      ) : null}
      {skills && (skills as any).length > 0 ? (
        <div className="flex justify-between gap-4">
          <Card className="divide-y-[1px] dark:divide-gray-700/80">
            {stats?.map((stats, index: number) => (
              <SingleStat
                key={`${stats.category}_${index}`}
                title={stats.category}
                description={stats.description}
              />
            ))}
            {(skills as any)?.map((skill: any, i) => {
              console.log(skill, skill.id, skillSelected, 'Asdfasdf');
              return (
                <div
                  className={`p-5 hover:bg-gray-100 cursor-pointer ${
                    skill.id === skillSelected && 'bg-gray-100'
                  }`}
                  onClick={() => {
                    if (skillSelected === skill.id) {
                      setSkillSelected(undefined);
                    } else {
                      setSkillSelected(skill.id);
                    }
                  }}
                >
                  <div className="flex justify-between">
                    <div className="my-2">{skill.skill} </div>
                    <Stars number={parseInt(skill.totalRatings || '0') || 0} />
                    {/* TODO: Make this an average */}
                    <div className="my-2 text-slate-500">{skill.NumOfRatings} Reviews</div>
                  </div>
                </div>
              );
            })}
          </Card>
          {skillSelected !== undefined && (
            <div className="w-full">
              <InfiniteScroll
                dataLength={100}
                hasMore={true}
                loader={null && <InfiniteLoader />}
                scrollThreshold={0.5}
                className="w-full"
              >
                <Card className="divide-y-[1px] dark:divide-gray-700/80 w-full">
                  {' '}
                  {reviews &&
                    reviews.map((review, index: number) => {
                      console.log(review);
                      return (
                        <SingleReview
                          key={`${review.title}_${index}`}
                          lensHandle={review.lensHandle}
                          profileUrl={review.profileUrl}
                          title={review.title}
                          description={review.description}
                          rating={review.score}
                        />
                      );
                    })}
                </Card>
              </InfiniteScroll>
            </div>
          )}
        </div>
      ) : (
        <div>No skills found. This user needs to to set some skills in order to get reviews!</div>
      )}
    </>
  );
};

export default Stats;
