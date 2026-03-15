# AWS Infrastructure Configuration

## Security Groups

Manage the EC2 security group for database access using the `manage-ip.sh` script.

### Prerequisites
- AWS CLI configured with appropriate IAM permissions
- `AWS_SECURITY_GROUP_ID` environment variable set
- `AWS_REGION` environment variable set (default: `us-east-1`)

### Usage

```bash
# Add an IP to the whitelist
./manage-ip.sh add 203.0.113.42

# Remove an IP from the whitelist
./manage-ip.sh remove 203.0.113.42

# List all allowed IPs
./manage-ip.sh list
```

## S3 Configuration

The portal uses AWS S3 for storing:
- Lesson materials and attachments
- Signed legal documents
- Student assignment submissions

### Bucket Policy Example

See `s3/bucket-policy.json` for the recommended S3 bucket policy.

## IAM Roles

The backend NestJS application requires the following IAM permissions:
- `ec2:AuthorizeSecurityGroupIngress`
- `ec2:RevokeSecurityGroupIngress`
- `ec2:DescribeSecurityGroups`
- `s3:PutObject`
- `s3:GetObject`
- `s3:DeleteObject`
