import { LensHubProxy } from '@abis/LensHubProxy';
import { useMutation } from '@apollo/client';
import Attachments from '@components/Shared/Attachments';
import { AudioPublicationSchema } from '@components/Shared/Audio';
import Markup from '@components/Shared/Markup';
import Preview from '@components/Shared/Preview';
import { Button } from '@components/UI/Button';
import { Card } from '@components/UI/Card';
import { ErrorMessage } from '@components/UI/ErrorMessage';
import { Input } from '@components/UI/Input';
import { MentionTextArea } from '@components/UI/MentionTextArea';
import { Spinner } from '@components/UI/Spinner';
import useBroadcast from '@components/utils/hooks/useBroadcast';
import type { LensterAttachment, LensterPublication } from '@generated/lenstertypes';
import type { CreatePublicCommentRequest, Mutation, Profile } from '@generated/types';
import { PublicationMainFocus } from '@generated/types';
import {
  CreateCommentTypedDataDocument,
  CreateCommentViaDispatcherDocument,
  ReferenceModules
} from '@generated/types';
import type { IGif } from '@giphy/js-types';
import { ChatAlt2Icon } from '@heroicons/react/outline';
import getSignature from '@lib/getSignature';
import getTags from '@lib/getTags';
import getTextNftUrl from '@lib/getTextNftUrl';
import getUserLocale from '@lib/getUserLocale';
import onError from '@lib/onError';
import splitSignature from '@lib/splitSignature';
import trimify from '@lib/trimify';
import uploadToArweave from '@lib/uploadToArweave';
import { BigNumber } from 'ethers';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  ALLOWED_AUDIO_TYPES,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  APP_NAME,
  LENSHUB_PROXY,
  RELAY_ON,
  SIGN_WALLET
} from 'src/constants';
import { useAppStore } from 'src/store/app';
import { useCollectModuleStore } from 'src/store/collectmodule';
import { usePublicationStore } from 'src/store/publication';
import { useReferenceModuleStore } from 'src/store/referencemodule';
import { useTransactionPersistStore } from 'src/store/transaction';
import { v4 as uuid } from 'uuid';
import { useContractWrite, useSignTypedData } from 'wagmi';
import ABI from '../../../thegraph/abis/Contract.json';
const Attachment = dynamic(() => import('@components/Shared/Attachment'), {
  loading: () => <div className="mb-1 w-5 h-5 rounded-lg shimmer" />
});
const Giphy = dynamic(() => import('@components/Shared/Giphy'), {
  loading: () => <div className="mb-1 w-5 h-5 rounded-lg shimmer" />
});
const CollectSettings = dynamic(() => import('@components/Shared/CollectSettings'), {
  loading: () => <div className="mb-1 w-5 h-5 rounded-lg shimmer" />
});
const ReferenceSettings = dynamic(() => import('@components/Shared/ReferenceSettings'), {
  loading: () => <div className="mb-1 w-5 h-5 rounded-lg shimmer" />
});

interface Props {
  profile: Profile;
  setShowAddReviewModal: any;
  skills: Array<any>;
}

const NewReview: FC<Props> = ({ profile, setShowAddReviewModal, skills }) => {
  // App store
  const userSigNonce = useAppStore((state) => state.userSigNonce);
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
  const currentProfile = useAppStore((state) => {
    console.log(state);
    return state.currentProfile;
  });

  // Publication store
  const publicationContent = usePublicationStore((state) => state.publicationContent);
  const setPublicationContent = usePublicationStore((state) => state.setPublicationContent);
  const audioPublication = usePublicationStore((state) => state.audioPublication);

  // Transaction persist store
  const txnQueue = useTransactionPersistStore((state) => state.txnQueue);
  const setTxnQueue = useTransactionPersistStore((state) => state.setTxnQueue);

  // Collect module store
  const payload = useCollectModuleStore((state) => state.payload);
  const resetCollectSettings = useCollectModuleStore((state) => state.reset);

  // Reference module store
  const selectedReferenceModule = useReferenceModuleStore((state) => state.selectedReferenceModule);
  const onlyFollowers = useReferenceModuleStore((state) => state.onlyFollowers);
  const degreesOfSeparation = useReferenceModuleStore((state) => state.degreesOfSeparation);

  // States
  const [rating1, setRating1] = useState('');
  const [rating2, setRating2] = useState('');
  const [rating3, setRating3] = useState('');
  const [rating4, setRating4] = useState('');
  const [review1, setReview1] = useState('');
  const [review2, setReview2] = useState('');
  const [review3, setReview3] = useState('');
  const [review4, setReview4] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [attachments, setAttachments] = useState<LensterAttachment[]>([]);

  const isAudioComment = ALLOWED_AUDIO_TYPES.includes(attachments[0]?.type);

  const onCompleted = () => {
    setPublicationContent('');
    setAttachments([]);
    resetCollectSettings();
    setShowAddReviewModal(false);
  };

  const { isLoading: signLoading, signTypedDataAsync } = useSignTypedData({ onError });

  const {
    error,
    isLoading: writeLoading,
    write
  } = useContractWrite({
    address: '0x0E5A55592bFa892a5c68c1f89260EDa7006E1165',
    abi: ABI,
    functionName: 'addReview',
    mode: 'recklesslyUnprepared',
    onSuccess: ({ hash }) => {
      console.log(hash);
      onCompleted();
    },
    onError
  });

  const createReview = async () => {
    write?.({
      recklesslySetUnpreparedArgs: [
        profile.ownedBy,
        BigNumber.from(parseInt(rating1 || '0') || 0),
        BigNumber.from(parseInt(rating2 || '0') || 0),
        BigNumber.from(parseInt(rating3 || '0') || 0),
        BigNumber.from(parseInt(rating4 || '0') || 0),
        review1,
        review2,
        review3,
        review4
      ]
    });
  };

  const isLoading = false;

  return (
    <Card className="px-5 pt-5 pb-3 gap-10">
      {error && <ErrorMessage className="mb-3" title="Transaction failed!" error={error} />}
      <Input
        label={skills.length > 1 ? `Review user's ${skills[0].skill} skill.` : 'Description'}
        onChange={(e) => setReview1(e.target.value)}
        placeholder="Skill 1 Review"
      />
      <Input prefix={'Stars'} onChange={(e) => setRating1(e.target.value)} />
      <Input
        label={skills.length > 2 ? `Review user's ${skills[1].skill} skill.` : 'Description'}
        onChange={(e) => setReview2(e.target.value)}
        placeholder="Skill 2 Review"
      />
      <Input prefix={'Stars'} onChange={(e) => setRating2(e.target.value)} />
      <Input
        label={skills.length > 3 ? `Review user's ${skills[2].skill} skill.` : 'Description'}
        onChange={(e) => setReview3(e.target.value)}
        placeholder="Skill 3 Review"
      />
      <Input prefix={'Stars'} onChange={(e) => setRating3(e.target.value)} />
      <Input
        label={skills.length > 4 ? `Review user's ${skills[3].skill} skill.` : 'Description'}
        onChange={(e) => setReview4(e.target.value)}
        placeholder="Skill 4 Review"
      />
      <Input prefix={'Stars'} onChange={(e) => setRating4(e.target.value)} />
      <div className="block items-center sm:flex">
        <div className="ml-auto pt-2 sm:pt-0">
          <Button
            disabled={isLoading}
            icon={isLoading ? <Spinner size="xs" /> : <ChatAlt2Icon className="w-4 h-4" />}
            onClick={createReview}
          >
            Create review
          </Button>
        </div>
      </div>
      <Attachments attachments={attachments} setAttachments={setAttachments} isNew />
    </Card>
  );
};

export default NewReview;
