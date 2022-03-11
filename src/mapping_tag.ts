import { BigInt } from "@graphprotocol/graph-ts"
import {
  AddTag, ClearTag, RemoveTag,
  
} from "../generated/Tag/Tag"
import { Tag } from "../generated/schema"


export function handleAddTag(event: AddTag): void {

  for ( let i = 0 ; i < event.params.tags.length ; i++){
    let id =  event.params.provider.toString() + "/" + event.params.cid + "/" + event.params.tags[i];
    
    let tag = Tag.load(id);
    if (tag == null) {
      tag = new Tag(id);
    }
    tag.cid = event.params.cid;
    tag.tag = event.params.tags[i];
    tag.provider = event.params.provider;
    tag.lastUpdate =  event.block.timestamp;
    tag.save();
  }
}

export function handleClearTag(event: ClearTag): void {
  for ( let i = 0 ; i < event.params.tags.length ; i++){
    let id =  event.params.provider.toString() + "/" + event.params.cid + "/" + event.params.tags[i];
    Tag.delete(id);
  }
}

export function handleRemoveTag(event: RemoveTag): void {

  for ( let i = 0 ; i < event.params.tags.length ; i++){
    let id =  event.params.provider.toString() + "/" + event.params.cid + "/" + event.params.tags[i];
    Tag.delete(id);
  }
  
}