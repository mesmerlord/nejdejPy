from config.settings.base import AWS_STORAGE_BUCKET_NAME

from storages.backends.s3boto3 import S3Boto3Storage


class UserAvatarStorage(S3Boto3Storage):
    bucket_name = AWS_STORAGE_BUCKET_NAME
    default_acl = 'public-read'

    def _get_security_token(self):
        return None

class CategoryImageStorage(S3Boto3Storage):
    bucket_name = AWS_STORAGE_BUCKET_NAME
    default_acl = 'public-read'

    def _get_security_token(self):
        return None

class ListingImageStorage(S3Boto3Storage):
    bucket_name = AWS_STORAGE_BUCKET_NAME
    default_acl = 'public-read'

    def _get_security_token(self):
        return None

class ReviewImageStorage(S3Boto3Storage):
    bucket_name = AWS_STORAGE_BUCKET_NAME
    default_acl = 'public-read'

    def _get_security_token(self):
        return None

class MediaStorage(S3Boto3Storage):
    bucket_name = AWS_STORAGE_BUCKET_NAME
    default_acl = 'public-read'

    def _get_security_token(self):
        return None