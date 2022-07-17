/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * Nejdej API
 * Documentation of API endpoints of Nejdej
 * OpenAPI spec version: 1.0.0
 */
import {
  useMutation,
  UseMutationOptions,
  MutationFunction
} from 'react-query'
import type {
  Login,
  SocialLoginRequest
} from '.././model'
import { customInstance } from '.././api/custom-instance'

type AwaitedInput<T> = PromiseLike<T> | T;

      type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;


/**
 * Post access token provided by facebook and receive auth token
 */
export const restAuthFacebookCreate = (
    socialLoginRequest: SocialLoginRequest,
 
) => {
      return customInstance<Login>(
      {url: `/rest-auth/facebook/`, method: 'post',
      headers: {'Content-Type': 'application/json'},
      data: socialLoginRequest
    },
      );
    }
  


    export type RestAuthFacebookCreateMutationResult = NonNullable<Awaited<ReturnType<typeof restAuthFacebookCreate>>>
    export type RestAuthFacebookCreateMutationBody = SocialLoginRequest
    export type RestAuthFacebookCreateMutationError = unknown

    export const useRestAuthFacebookCreate = <TError = unknown,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof restAuthFacebookCreate>>, TError,{data: SocialLoginRequest}, TContext>, }
) => {
      const {mutation: mutationOptions} = options ?? {}

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof restAuthFacebookCreate>>, {data: SocialLoginRequest}> = (props) => {
          const {data} = props ?? {};

          return  restAuthFacebookCreate(data,)
        }

      return useMutation<Awaited<ReturnType<typeof restAuthFacebookCreate>>, TError, {data: SocialLoginRequest}, TContext>(mutationFn, mutationOptions)
    }
    /**
 * Post access token provided by google and receive auth token
 */
export const restAuthGoogleCreate = (
    socialLoginRequest: SocialLoginRequest,
 
) => {
      return customInstance<Login>(
      {url: `/rest-auth/google/`, method: 'post',
      headers: {'Content-Type': 'application/json'},
      data: socialLoginRequest
    },
      );
    }
  


    export type RestAuthGoogleCreateMutationResult = NonNullable<Awaited<ReturnType<typeof restAuthGoogleCreate>>>
    export type RestAuthGoogleCreateMutationBody = SocialLoginRequest
    export type RestAuthGoogleCreateMutationError = unknown

    export const useRestAuthGoogleCreate = <TError = unknown,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof restAuthGoogleCreate>>, TError,{data: SocialLoginRequest}, TContext>, }
) => {
      const {mutation: mutationOptions} = options ?? {}

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof restAuthGoogleCreate>>, {data: SocialLoginRequest}> = (props) => {
          const {data} = props ?? {};

          return  restAuthGoogleCreate(data,)
        }

      return useMutation<Awaited<ReturnType<typeof restAuthGoogleCreate>>, TError, {data: SocialLoginRequest}, TContext>(mutationFn, mutationOptions)
    }
    