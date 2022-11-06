import EventType from '@components/Home/Timeline/EventType';
import UserProfile from '@components/Shared/UserProfile';
import type { LensterPublication } from '@generated/lenstertypes';
import type { ElectedMirror, FeedItem } from '@generated/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import Stars from './Stars';

dayjs.extend(relativeTime);

interface Props {
  // publication: LensterPublication;
  // feedItem?: FeedItem;
  // showType?: boolean;
  // showActions?: boolean;
  // showModActions?: boolean;
  // showThread?: boolean;
  title: string;
  description: string;
  rating: number;
  lensHandle: string;
  profileUrl: string;
}

const SingleReview: FC<Props> = ({
  // publication,
  // feedItem,
  // showType = true,
  // showActions = true,
  // showModActions = false,
  // showThread = true
  title,
  description,
  rating,
  lensHandle,
  profileUrl
}) => {
  const { push } = useRouter();
  // const isMirror = publication.__typename === 'Mirror';
  // const firstComment = feedItem?.comments && feedItem.comments[0];
  // const rootPublication = feedItem ? (firstComment ? firstComment : feedItem?.root) : publication;
  // const profile = feedItem
  //   ? rootPublication.profile
  //   : isMirror
  //   ? publication?.mirrorOf?.profile
  //   : publication?.profile;
  // const timestamp = feedItem
  //   ? rootPublication.createdAt
  //   : isMirror
  //   ? publication?.mirrorOf?.createdAt
  //   : publication?.createdAt;

  return (
    <>
      <article className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer first:rounded-t-xl last:rounded-b-xl p-5">
        <Link href={`/u/${lensHandle}`} onClick={(e) => {
          e.preventDefault();
          window.location.href = `/u/${lensHandle}`
        }}>
          <div className="flex align-middle mb-3">
            <div className="mt-0 w-fit">
              <img src={profileUrl} className="rounded-full w-14 " alt="profile picture" />
            </div>
            <div className="text-center my-auto ml-2">@{lensHandle}</div>
          </div>
          <div className="font-thin pb-2">{title}</div>
          <Stars number={rating} />
          <div className="font-normal text-slate-500">{description}</div>
        </Link>
      </article>
    </>
  );
};

export default SingleReview;
