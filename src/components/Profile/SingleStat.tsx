import EventType from '@components/Home/Timeline/EventType';
import UserProfile from '@components/Shared/UserProfile';
import type { LensterPublication } from '@generated/lenstertypes';
import type { ElectedMirror, FeedItem } from '@generated/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import type { FC } from 'react';

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
}

const SingleStat: FC<Props> = ({
  // publication,
  // feedItem,
  // showType = true,
  // showActions = true,
  // showModActions = false,
  // showThread = true
  title,
  description
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
    <article className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer first:rounded-t-xl last:rounded-b-xl p-5">
      <div className="font-thin">{title}</div>
      <div className="font-normal text-slate-500">{description}</div>
    </article>
  );
};

export default SingleStat;
