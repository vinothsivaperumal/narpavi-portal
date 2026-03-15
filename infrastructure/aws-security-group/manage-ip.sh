#!/bin/bash
# AWS Security Group IP Whitelist Management Script
# Manages EC2 security group rules for database access

set -e

SECURITY_GROUP_ID="${AWS_SECURITY_GROUP_ID}"
AWS_REGION="${AWS_REGION:-us-east-1}"
DB_PORT="${DB_PORT:-5432}"

usage() {
  echo "Usage: $0 [add|remove|list] [IP_ADDRESS]"
  echo "  add    <ip>  - Add IP to the security group (CIDR /32)"
  echo "  remove <ip>  - Remove IP from the security group"
  echo "  list         - List all current IP rules"
  exit 1
}

check_deps() {
  if ! command -v aws &>/dev/null; then
    echo "Error: AWS CLI not found. Install from https://aws.amazon.com/cli/"
    exit 1
  fi
}

add_ip() {
  local ip="$1/32"
  echo "Adding IP $ip to security group $SECURITY_GROUP_ID on port $DB_PORT..."
  aws ec2 authorize-security-group-ingress \
    --group-id "$SECURITY_GROUP_ID" \
    --protocol tcp \
    --port "$DB_PORT" \
    --cidr "$ip" \
    --region "$AWS_REGION"
  echo "IP $ip added successfully."
}

remove_ip() {
  local ip="$1/32"
  echo "Removing IP $ip from security group $SECURITY_GROUP_ID..."
  aws ec2 revoke-security-group-ingress \
    --group-id "$SECURITY_GROUP_ID" \
    --protocol tcp \
    --port "$DB_PORT" \
    --cidr "$ip" \
    --region "$AWS_REGION"
  echo "IP $ip removed successfully."
}

list_rules() {
  echo "Current IP rules for security group $SECURITY_GROUP_ID:"
  aws ec2 describe-security-groups \
    --group-ids "$SECURITY_GROUP_ID" \
    --region "$AWS_REGION" \
    --query 'SecurityGroups[0].IpPermissions' \
    --output table
}

check_deps

case "$1" in
  add)
    [[ -z "$2" ]] && usage
    add_ip "$2"
    ;;
  remove)
    [[ -z "$2" ]] && usage
    remove_ip "$2"
    ;;
  list)
    list_rules
    ;;
  *)
    usage
    ;;
esac
