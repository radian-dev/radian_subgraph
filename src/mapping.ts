import { BigInt } from "@graphprotocol/graph-ts"
import {
  ProfileContractUpgradable,
  AddAddressToProfile,
  AddExternalAddressToProfile,
  AddProfileMapping,
  CreateProfile,
  UpdateProfile
} from "../generated/ProfileContractUpgradable/ProfileContractUpgradable"
import { Profile, Address, ExternalAddress } from "../generated/schema"

export function handleAddAddressToProfile(event: AddAddressToProfile): void {

  let id = event.params.profileID.toString();
  let profile = Profile.load(id);
  if (profile == null) {
    profile = new Profile(id);
  }
  // profile.addresses = profile.addresses.concat([event.params.initiator]);
  profile.save();

  // save address information
  let address = new Address(event.params.initiator.toHex());
  address.address = event.params.initiator;
  address.profile = id;
  address.save();

  // let contract = Contract.bind(event.address)

}

export function handleCreateProfile(event: CreateProfile): void {
  let id = event.params.profileID.toString();
  let profile = new Profile(id);
  profile.profileID = event.params.profileID;
  profile.identityID = event.params.identityID;
  profile.save();

  // save address information
  let address = new Address(event.params.creator.toHex());
  address.address = event.params.creator;
  address.profile = id;
  address.save();
}

export function handleUpdateProfile(event: UpdateProfile): void {
  let id = event.params.profileID.toString();
  let profile = Profile.load(id);
  if (profile == null) {
    profile = new Profile(id);
  }
  profile.identityID = event.params.identityID;
  profile.save();
}

export function handleAddProfileMapping(event: AddProfileMapping): void {

}

export function handleAddExternalAddressToProfile(
  event: AddExternalAddressToProfile
): void {
  let id = event.params.profileID.toString();
  let profile = Profile.load(id);
  if (profile == null) {
    profile = new Profile(id);
  }
  profile.save();

  // save address information
  let externalAddress = new ExternalAddress(event.params.externalAddress + "/" + event.params.networkID.toString());
  externalAddress.externalAddress = event.params.externalAddress;
  externalAddress.networkID = event.params.networkID;
  externalAddress.profile = id;
  externalAddress.save();
}