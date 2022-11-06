import { Address, BigInt, log } from '@graphprotocol/graph-ts';
import { ResponseReceived, ReviewAdded, skillset } from '../generated/Contract/Contract';
import { Skill, Review } from '../generated/schema';

export function handleResponseReceived(event: ResponseReceived): void {}

export function handleskillset(event: skillset): void {
  _getOrCreateSkillset(event.params.p1, event.params.a);
  _getOrCreateSkillset(event.params.p2, event.params.a);
  _getOrCreateSkillset(event.params.p3, event.params.a);
  _getOrCreateSkillset(event.params.p4, event.params.a);
}

function _getOrCreateSkillset(title: string, account: Address): void {
  let skill = Skill.load(title);
  if (skill == null) {
    skill = new Skill(title);
  }
  skill.skill = title;
  skill.account = account.toHexString();
  skill.totalRatings = BigInt.fromI32(0);
  skill.NumOfRatings = BigInt.fromI32(0);
  skill.save();
}

export function handleReviewAdded(event: ReviewAdded): void {
  _getOrCreateReview(
    event.params.skillName,
    event.params.rating,
    event.params.review,
    event.params.reviewer,
    event.params.reviewee
  );
}

function _getOrCreateReview(
  title: string,
  rating: BigInt,
  description: string,
  reviewer: Address,
  reviewee: Address
): void {
  let skill = Skill.load(title);
  if (skill == null) {
    log.warning('Skipping review creation, skill is null, searching title {}', [title]);
    return;
  }
  let reviewId = reviewer.toHexString() + '-' + reviewee.toHexString() + '-' + skill.id;
  let review = Review.load(reviewId);
  if (review == null) {
    review = new Review(reviewId);
  }

  review.rating = rating;
  review.description = description;
  review.skill = skill.id;
  review.reviewer = reviewer.toHexString();
  review.reviewee = reviewee.toHexString();
  review.save();
  return;
}
