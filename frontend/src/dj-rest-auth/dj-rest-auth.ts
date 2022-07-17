/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * Nejdej API
 * Documentation of API endpoints of Nejdej
 * OpenAPI spec version: 1.0.0
 */
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  UseQueryOptions,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  UseInfiniteQueryResult,
  QueryKey
} from 'react-query'
import type {
  Token,
  LoginRequest,
  RestAuthDetail,
  PasswordChangeRequest,
  PasswordResetRequest,
  PasswordResetConfirmRequest,
  UserDetails,
  UserDetailsRequest,
  PatchedUserDetailsRequest
} from '.././model'
import { customInstance } from '.././api/custom-instance'

type AwaitedInput<T> = PromiseLike<T> | T;

      type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;


/**
 * Check the credentials and return the REST Token
if the credentials are valid and authenticated.
Calls Django Auth login method to register User ID
in Django session framework

Accept the following POST parameters: username, password
Return the REST Framework Token Object's key.
 */
export const djRestAuthLoginCreate = (
    loginRequest: LoginRequest,
 
) => {
      return customInstance<Token>(
      {url: `/dj-rest-auth/login/`, method: 'post',
      headers: {'Content-Type': 'application/json'},
      data: loginRequest
    },
      );
    }
  


    export type DjRestAuthLoginCreateMutationResult = NonNullable<Awaited<ReturnType<typeof djRestAuthLoginCreate>>>
    export type DjRestAuthLoginCreateMutationBody = LoginRequest
    export type DjRestAuthLoginCreateMutationError = unknown

    export const useDjRestAuthLoginCreate = <TError = unknown,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof djRestAuthLoginCreate>>, TError,{data: LoginRequest}, TContext>, }
) => {
      const {mutation: mutationOptions} = options ?? {}

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof djRestAuthLoginCreate>>, {data: LoginRequest}> = (props) => {
          const {data} = props ?? {};

          return  djRestAuthLoginCreate(data,)
        }

      return useMutation<Awaited<ReturnType<typeof djRestAuthLoginCreate>>, TError, {data: LoginRequest}, TContext>(mutationFn, mutationOptions)
    }
    /**
 * Calls Django logout method and delete the Token object
assigned to the current User object.

Accepts/Returns nothing.
 */
export const djRestAuthLogoutCreate = (
    
 
) => {
      return customInstance<RestAuthDetail>(
      {url: `/dj-rest-auth/logout/`, method: 'post'
    },
      );
    }
  


    export type DjRestAuthLogoutCreateMutationResult = NonNullable<Awaited<ReturnType<typeof djRestAuthLogoutCreate>>>
    
    export type DjRestAuthLogoutCreateMutationError = unknown

    export const useDjRestAuthLogoutCreate = <TError = unknown,
    TVariables = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof djRestAuthLogoutCreate>>, TError,TVariables, TContext>, }
) => {
      const {mutation: mutationOptions} = options ?? {}

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof djRestAuthLogoutCreate>>, TVariables> = () => {
          ;

          return  djRestAuthLogoutCreate()
        }

      return useMutation<Awaited<ReturnType<typeof djRestAuthLogoutCreate>>, TError, TVariables, TContext>(mutationFn, mutationOptions)
    }
    /**
 * Calls Django Auth SetPasswordForm save method.

Accepts the following POST parameters: new_password1, new_password2
Returns the success/fail message.
 */
export const djRestAuthPasswordChangeCreate = (
    passwordChangeRequest: PasswordChangeRequest,
 
) => {
      return customInstance<RestAuthDetail>(
      {url: `/dj-rest-auth/password/change/`, method: 'post',
      headers: {'Content-Type': 'application/json'},
      data: passwordChangeRequest
    },
      );
    }
  


    export type DjRestAuthPasswordChangeCreateMutationResult = NonNullable<Awaited<ReturnType<typeof djRestAuthPasswordChangeCreate>>>
    export type DjRestAuthPasswordChangeCreateMutationBody = PasswordChangeRequest
    export type DjRestAuthPasswordChangeCreateMutationError = unknown

    export const useDjRestAuthPasswordChangeCreate = <TError = unknown,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof djRestAuthPasswordChangeCreate>>, TError,{data: PasswordChangeRequest}, TContext>, }
) => {
      const {mutation: mutationOptions} = options ?? {}

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof djRestAuthPasswordChangeCreate>>, {data: PasswordChangeRequest}> = (props) => {
          const {data} = props ?? {};

          return  djRestAuthPasswordChangeCreate(data,)
        }

      return useMutation<Awaited<ReturnType<typeof djRestAuthPasswordChangeCreate>>, TError, {data: PasswordChangeRequest}, TContext>(mutationFn, mutationOptions)
    }
    /**
 * Calls Django Auth PasswordResetForm save method.

Accepts the following POST parameters: email
Returns the success/fail message.
 */
export const djRestAuthPasswordResetCreate = (
    passwordResetRequest: PasswordResetRequest,
 
) => {
      return customInstance<RestAuthDetail>(
      {url: `/dj-rest-auth/password/reset/`, method: 'post',
      headers: {'Content-Type': 'application/json'},
      data: passwordResetRequest
    },
      );
    }
  


    export type DjRestAuthPasswordResetCreateMutationResult = NonNullable<Awaited<ReturnType<typeof djRestAuthPasswordResetCreate>>>
    export type DjRestAuthPasswordResetCreateMutationBody = PasswordResetRequest
    export type DjRestAuthPasswordResetCreateMutationError = unknown

    export const useDjRestAuthPasswordResetCreate = <TError = unknown,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof djRestAuthPasswordResetCreate>>, TError,{data: PasswordResetRequest}, TContext>, }
) => {
      const {mutation: mutationOptions} = options ?? {}

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof djRestAuthPasswordResetCreate>>, {data: PasswordResetRequest}> = (props) => {
          const {data} = props ?? {};

          return  djRestAuthPasswordResetCreate(data,)
        }

      return useMutation<Awaited<ReturnType<typeof djRestAuthPasswordResetCreate>>, TError, {data: PasswordResetRequest}, TContext>(mutationFn, mutationOptions)
    }
    /**
 * Password reset e-mail link is confirmed, therefore
this resets the user's password.

Accepts the following POST parameters: token, uid,
    new_password1, new_password2
Returns the success/fail message.
 */
export const djRestAuthPasswordResetConfirmCreate = (
    passwordResetConfirmRequest: PasswordResetConfirmRequest,
 
) => {
      return customInstance<RestAuthDetail>(
      {url: `/dj-rest-auth/password/reset/confirm/`, method: 'post',
      headers: {'Content-Type': 'application/json'},
      data: passwordResetConfirmRequest
    },
      );
    }
  


    export type DjRestAuthPasswordResetConfirmCreateMutationResult = NonNullable<Awaited<ReturnType<typeof djRestAuthPasswordResetConfirmCreate>>>
    export type DjRestAuthPasswordResetConfirmCreateMutationBody = PasswordResetConfirmRequest
    export type DjRestAuthPasswordResetConfirmCreateMutationError = unknown

    export const useDjRestAuthPasswordResetConfirmCreate = <TError = unknown,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof djRestAuthPasswordResetConfirmCreate>>, TError,{data: PasswordResetConfirmRequest}, TContext>, }
) => {
      const {mutation: mutationOptions} = options ?? {}

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof djRestAuthPasswordResetConfirmCreate>>, {data: PasswordResetConfirmRequest}> = (props) => {
          const {data} = props ?? {};

          return  djRestAuthPasswordResetConfirmCreate(data,)
        }

      return useMutation<Awaited<ReturnType<typeof djRestAuthPasswordResetConfirmCreate>>, TError, {data: PasswordResetConfirmRequest}, TContext>(mutationFn, mutationOptions)
    }
    /**
 * Reads and updates UserModel fields
Accepts GET, PUT, PATCH methods.

Default accepted fields: username, first_name, last_name
Default display fields: pk, username, email, first_name, last_name
Read-only fields: pk, email

Returns UserModel fields.
 */
export const djRestAuthUserRetrieve = (
    
 signal?: AbortSignal
) => {
      return customInstance<UserDetails>(
      {url: `/dj-rest-auth/user/`, method: 'get', signal
    },
      );
    }
  

export const getDjRestAuthUserRetrieveQueryKey = () => [`/dj-rest-auth/user/`];

    
export type DjRestAuthUserRetrieveInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof djRestAuthUserRetrieve>>>
export type DjRestAuthUserRetrieveInfiniteQueryError = unknown

export const useDjRestAuthUserRetrieveInfinite = <TData = Awaited<ReturnType<typeof djRestAuthUserRetrieve>>, TError = unknown>(
  options?: { query?:UseInfiniteQueryOptions<Awaited<ReturnType<typeof djRestAuthUserRetrieve>>, TError, TData>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions} = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getDjRestAuthUserRetrieveQueryKey();

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof djRestAuthUserRetrieve>>> = ({ signal }) => djRestAuthUserRetrieve(signal);

  const query = useInfiniteQuery<Awaited<ReturnType<typeof djRestAuthUserRetrieve>>, TError, TData>(queryKey, queryFn, {  staleTime: Infinity,  ...queryOptions})

  return {
    queryKey,
    ...query
  }
}

export type DjRestAuthUserRetrieveQueryResult = NonNullable<Awaited<ReturnType<typeof djRestAuthUserRetrieve>>>
export type DjRestAuthUserRetrieveQueryError = unknown

export const useDjRestAuthUserRetrieve = <TData = Awaited<ReturnType<typeof djRestAuthUserRetrieve>>, TError = unknown>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof djRestAuthUserRetrieve>>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions} = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getDjRestAuthUserRetrieveQueryKey();

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof djRestAuthUserRetrieve>>> = ({ signal }) => djRestAuthUserRetrieve(signal);

  const query = useQuery<Awaited<ReturnType<typeof djRestAuthUserRetrieve>>, TError, TData>(queryKey, queryFn, {  staleTime: Infinity,  ...queryOptions})

  return {
    queryKey,
    ...query
  }
}

/**
 * Reads and updates UserModel fields
Accepts GET, PUT, PATCH methods.

Default accepted fields: username, first_name, last_name
Default display fields: pk, username, email, first_name, last_name
Read-only fields: pk, email

Returns UserModel fields.
 */
export const djRestAuthUserUpdate = (
    userDetailsRequest: UserDetailsRequest,
 
) => {
      return customInstance<UserDetails>(
      {url: `/dj-rest-auth/user/`, method: 'put',
      headers: {'Content-Type': 'application/json'},
      data: userDetailsRequest
    },
      );
    }
  


    export type DjRestAuthUserUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof djRestAuthUserUpdate>>>
    export type DjRestAuthUserUpdateMutationBody = UserDetailsRequest
    export type DjRestAuthUserUpdateMutationError = unknown

    export const useDjRestAuthUserUpdate = <TError = unknown,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof djRestAuthUserUpdate>>, TError,{data: UserDetailsRequest}, TContext>, }
) => {
      const {mutation: mutationOptions} = options ?? {}

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof djRestAuthUserUpdate>>, {data: UserDetailsRequest}> = (props) => {
          const {data} = props ?? {};

          return  djRestAuthUserUpdate(data,)
        }

      return useMutation<Awaited<ReturnType<typeof djRestAuthUserUpdate>>, TError, {data: UserDetailsRequest}, TContext>(mutationFn, mutationOptions)
    }
    /**
 * Reads and updates UserModel fields
Accepts GET, PUT, PATCH methods.

Default accepted fields: username, first_name, last_name
Default display fields: pk, username, email, first_name, last_name
Read-only fields: pk, email

Returns UserModel fields.
 */
export const djRestAuthUserPartialUpdate = (
    patchedUserDetailsRequest: PatchedUserDetailsRequest,
 
) => {
      return customInstance<UserDetails>(
      {url: `/dj-rest-auth/user/`, method: 'patch',
      headers: {'Content-Type': 'application/json'},
      data: patchedUserDetailsRequest
    },
      );
    }
  


    export type DjRestAuthUserPartialUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof djRestAuthUserPartialUpdate>>>
    export type DjRestAuthUserPartialUpdateMutationBody = PatchedUserDetailsRequest
    export type DjRestAuthUserPartialUpdateMutationError = unknown

    export const useDjRestAuthUserPartialUpdate = <TError = unknown,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof djRestAuthUserPartialUpdate>>, TError,{data: PatchedUserDetailsRequest}, TContext>, }
) => {
      const {mutation: mutationOptions} = options ?? {}

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof djRestAuthUserPartialUpdate>>, {data: PatchedUserDetailsRequest}> = (props) => {
          const {data} = props ?? {};

          return  djRestAuthUserPartialUpdate(data,)
        }

      return useMutation<Awaited<ReturnType<typeof djRestAuthUserPartialUpdate>>, TError, {data: PatchedUserDetailsRequest}, TContext>(mutationFn, mutationOptions)
    }
    