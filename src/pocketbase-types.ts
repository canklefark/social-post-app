/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Clients = "clients",
	Posts = "posts",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum ClientsPlatformsOptions {
	"Facebook" = "Facebook",
	"Instagram" = "Instagram",
	"Twitter" = "Twitter",
	"LinkedIn" = "LinkedIn",
}
export type ClientsRecord = {
	description?: string
	name: string
	platforms?: ClientsPlatformsOptions[]
}

export enum PostsPlatformOptions {
	"Facebook" = "Facebook",
	"Instagram" = "Instagram",
	"Twitter" = "Twitter",
	"LinkedIn" = "LinkedIn",
}
export type PostsRecord = {
	caption?: string
	client?: RecordIdString
	dueDate?: IsoDateString
	image?: string
	isApproved?: boolean
	platform?: PostsPlatformOptions[]
	postDate?: IsoDateString
	responsiblePerson?: string
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ClientsResponse<Texpand = unknown> = Required<ClientsRecord> & BaseSystemFields<Texpand>
export type PostsResponse<Texpand = unknown> = Required<PostsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	clients: ClientsRecord
	posts: PostsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	clients: ClientsResponse
	posts: PostsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'clients'): RecordService<ClientsResponse>
	collection(idOrName: 'posts'): RecordService<PostsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
