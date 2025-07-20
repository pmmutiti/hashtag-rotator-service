

This serverless microservice fetches real-time trending hashtags from Trends24.in based on a region query. It’s designed for civic dashboards, rotating headline widgets, and data-driven journalism tools that spotlight public conversations.

The function parses HTML from Trends24, extracts hashtags, and returns them as JSON using the following endpoint structure:

GET /api/trends?region=kenya 

## 📜 License This project is licensed under the MIT License © 2025 Peter M. Mutiti. You're free to use, modify, and deploy this tool for civic and public good. See the LICENSE file for details. 
