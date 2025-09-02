#!/bin/bash

# Customize with your live deployment base URL
BASE_URL="https://hashtag-rotator-service.vercel.app"
LOG_FILE="test-log-$(date +%Y%m%d-%H%M%S).txt"

echo "🚦 Starting endpoint tests..." | tee "$LOG_FILE"

# Helper: test one endpoint
test_endpoint() {
  local path="$1"
  local label="$2"
  echo -e "\n🔎 Testing $label ($path)..." | tee -a "$LOG_FILE"
  curl -s -D - "$BASE_URL$path" -o - | tee -a "$LOG_FILE"
  if [ $? -eq 0 ]; then
    echo -e "✅ $label test passed" | tee -a "$LOG_FILE"
  else
    echo -e "❌ $label test failed" | tee -a "$LOG_FILE"
  fi
}

# 🩺 Test Health
test_endpoint "/api/health" "Health Check"

# ⏰ Test Cron
test_endpoint "/api/cron" "Cron Job"

# 🌍 Test Trends (Kenya)
test_endpoint "/api/trends?region=kenya" "Kenya Hashtag Trends"

# 📡 Test Rewrite Route
test_endpoint "/kenya-trends" "Geo-Routed Rewrite"

# 🧪 Test Diagnostics
test_endpoint "/api/diagnostics" "Webhook Diagnostics"

echo -e "\n📦 Log saved to $LOG_FILE"
