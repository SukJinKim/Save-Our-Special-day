import boto3
from botocore.exceptions import ClientError
from app.core.config import settings

from botocore.config import Config

def get_s3_client():
    return boto3.client(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_REGION,
        endpoint_url=f"https://s3.{settings.AWS_REGION}.amazonaws.com",
        config=Config(signature_version='s3v4')
    )

def create_presigned_url(object_name: str, expiration: int = 600) -> str:
    """Generate a presigned URL to share an S3 object

    :param object_name: string
    :param expiration: Time in seconds for the presigned URL to remain valid
    :return: Presigned URL as string. If error, returns None.
    """
    s3_client = get_s3_client()
    try:
        response = s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket': settings.S3_BUCKET_NAME,
                                                            'Key': object_name},
                                                    ExpiresIn=expiration)
    except ClientError as e:
        print(f"Error generating presigned URL: {e}")
        return None

    return response

def list_objects():
    """List objects in the configured bucket"""
    s3_client = get_s3_client()
    try:
        response = s3_client.list_objects_v2(Bucket=settings.S3_BUCKET_NAME)
        return response.get('Contents', [])
    except ClientError as e:
        print(f"Error listing objects: {e}")
        return []
