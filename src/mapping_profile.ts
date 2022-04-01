import { BigInt } from "@graphprotocol/graph-ts"
import {
  AddExternalNetwork,
  SetExternalNetworkState,
  AddAddressToProfile,
  AddExternalAddressToProfile,
  AddExternalProfileMapping,
  AddProfileMapping,
  CreateProfile,
  UpdateProfile
} from "../generated/ProfileContractUpgradable/ProfileContractUpgradable"
import { Profile, Address, ExternalAddress, ExternalProfile, ExternalNetwork } from "../generated/schema"

export function handleAddAddressToProfile(event: AddAddressToProfile): void {

  let id = event.params.profileID.toString();
  let profile = Profile.load(id);
  if (profile == null) {
    profile = new Profile(id);
  }
  // profile.addresses = profile.addresses.concat([event.params.initiator]);
  profile.lastUpdate = event.block.timestamp;
  profile.save();

  // save address information
  let address = new Address(event.params.initiator.toHex());
  address.address = event.params.initiator;
  address.profile = id;
  address.lastUpdate = event.block.timestamp;
  address.save();

  // let contract = Contract.bind(event.address)

}

export function handleCreateProfile(event: CreateProfile): void {
  let id = event.params.profileID.toString();
  let profile = new Profile(id);
  profile.profileID = event.params.profileID;
  profile.identityID = event.params.identityID;
  profile.lastUpdate = event.block.timestamp;
  profile.save();

  // save address information
  let address = new Address(event.params.creator.toHex());
  address.address = event.params.creator;
  address.profile = id;
  address.lastUpdate = event.block.timestamp;
  address.save();
}

export function handleUpdateProfile(event: UpdateProfile): void {
  let id = event.params.profileID.toString();
  let profile = Profile.load(id);
  if (profile == null) {
    profile = new Profile(id);
  }
  profile.identityID = event.params.identityID;
  profile.lastUpdate = event.block.timestamp;
  profile.save();
}

export function handleAddExternalProfileMapping(event: AddExternalProfileMapping): void {
  let id =  event.params.networkID.toString() + "/" + event.params.profileID.toString();
  let externalProfile = ExternalProfile.load(id);
  if (externalProfile == null) {
    externalProfile = new ExternalProfile(id);
  }
  externalProfile.profileID = event.params.profileID;
  externalProfile.networkID = event.params.networkID;
  externalProfile.address = event.params.initiator;
  externalProfile.lastUpdate = event.block.timestamp;
  externalProfile.save();
}

export function handleAddExternalNetwork(event: AddExternalNetwork): void {
  let id =  event.params.networkID.toString();
  let externalNetwork = ExternalNetwork.load(id);
  if (externalNetwork == null) {
    externalNetwork = new ExternalNetwork(id);
  }
  externalNetwork.networkID = event.params.networkID;
  externalNetwork.networkType = event.params.networkType;
  externalNetwork.enabled = true;
  externalNetwork.lastUpdate = event.block.timestamp;
  externalNetwork.save();
}

export function handleSetExternalNetworkState(event: SetExternalNetworkState): void {
  let id =  event.params.networkID.toString();
  let externalNetwork = ExternalNetwork.load(id);
  if (externalNetwork == null) {
    externalNetwork = new ExternalNetwork(id);
  }
  externalNetwork.enabled = event.params.isEnabled;
  externalNetwork.lastUpdate = event.block.timestamp;
  externalNetwork.save();
}

export function handleAddExternalAddressToProfile(
  event: AddExternalAddressToProfile
): void {
  let id = event.params.profileID.toString();
  let profile = Profile.load(id);
  if (profile == null) {
    profile = new Profile(id);
  }
  profile.lastUpdate = event.block.timestamp;
  profile.save();

  // save address information
  let externalAddress = new ExternalAddress(event.params.externalAddress + "/" + event.params.networkID.toString());
  externalAddress.externalAddress = event.params.externalAddress;
  externalAddress.networkID = event.params.networkID;
  externalAddress.profile = id;
  externalAddress.lastUpdate = event.block.timestamp;
  externalAddress.save();
}