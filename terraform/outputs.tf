output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.proshop_server.id
}

output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.proshop_server.public_ip
}

output "instance_public_dns" {
  description = "Public DNS name of the EC2 instance"
  value       = aws_instance.proshop_server.public_dns
}

output "website_url" {
  description = "URL to access the ProShop website"
  value       = "http://${aws_instance.proshop_server.public_ip}"
}

output "ssh_command" {
  description = "SSH command to connect to the instance"
  value       = "ssh -i ~/.ssh/${var.key_name}.pem ubuntu@${aws_instance.proshop_server.public_ip}"
}

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.proshop_vpc.id
}

output "subnet_id" {
  description = "ID of the public subnet"
  value       = aws_subnet.proshop_public_subnet.id
}

output "security_group_id" {
  description = "ID of the security group"
  value       = aws_security_group.proshop_sg.id
}

output "deployment_status" {
  description = "Instructions for checking deployment status"
  value = <<-EOT
    🚀 ProShop Deployment Complete!
    
    📍 Website URL: http://${aws_instance.proshop_server.public_ip}
    🔗 SSH Access: ssh -i ~/.ssh/${var.key_name}.pem ubuntu@${aws_instance.proshop_server.public_ip}
    
    📋 To check deployment status:
    1. SSH into the instance
    2. Check PM2 status: pm2 status
    3. Check nginx status: sudo systemctl status nginx
    4. Check logs: pm2 logs
    
    ⏱️  Note: Initial deployment may take 5-10 minutes to complete.
    EOT
}
