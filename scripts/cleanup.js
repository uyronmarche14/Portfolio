#!/usr/bin/env node

/**
 * Cleanup script to identify and remove unused files and dependencies
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const PROJECT_ROOT = path.join(__dirname, "..");
const APP_DIR = path.join(PROJECT_ROOT, "app");

// Colors for console output
const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Check for unused dependencies
function checkUnusedDependencies() {
  log("\n🔍 Checking for unused dependencies...", "blue");

  try {
    // This would require installing depcheck
    // execSync('npx depcheck', { stdio: 'inherit', cwd: PROJECT_ROOT });
    log(
      "ℹ️  Install depcheck to analyze unused dependencies: npm install -g depcheck",
      "yellow"
    );
  } catch (error) {
    log("❌ Error checking dependencies", "red");
  }
}

// Find files with TODO/FIXME comments
function findTodoComments() {
  log("\n🔍 Finding TODO/FIXME comments...", "blue");

  try {
    const result = execSync(
      'grep -r "TODO\\|FIXME\\|HACK\\|XXX" app/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" -n',
      { cwd: PROJECT_ROOT, encoding: "utf8" }
    );

    if (result.trim()) {
      log("📝 Found TODO/FIXME comments:", "yellow");
      console.log(result);
    } else {
      log("✅ No TODO/FIXME comments found", "green");
    }
  } catch (error) {
    log("✅ No TODO/FIXME comments found", "green");
  }
}

// Find console.log statements
function findConsoleStatements() {
  log("\n🔍 Finding console statements...", "blue");

  try {
    const result = execSync(
      'grep -r "console\\." app/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" -n',
      { cwd: PROJECT_ROOT, encoding: "utf8" }
    );

    if (result.trim()) {
      log(
        "📝 Found console statements (consider using logger instead):",
        "yellow"
      );
      console.log(result);
    } else {
      log("✅ No console statements found", "green");
    }
  } catch (error) {
    log("✅ No console statements found", "green");
  }
}

// Check for large files
function findLargeFiles() {
  log("\n🔍 Finding large files (>100KB)...", "blue");

  try {
    const result = execSync(
      'find app/ -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \\) -size +100k -exec ls -lh {} \\;',
      { cwd: PROJECT_ROOT, encoding: "utf8" }
    );

    if (result.trim()) {
      log("📦 Found large files:", "yellow");
      console.log(result);
    } else {
      log("✅ No large files found", "green");
    }
  } catch (error) {
    log("✅ No large files found", "green");
  }
}

// Check for duplicate code
function checkDuplicateCode() {
  log("\n🔍 Checking for potential duplicate code patterns...", "blue");

  // This is a simple check - in a real scenario you'd use tools like jscpd
  log(
    "ℹ️  Consider using jscpd for duplicate code detection: npm install -g jscpd",
    "yellow"
  );
}

// Clean up build artifacts
function cleanBuildArtifacts() {
  log("\n🧹 Cleaning build artifacts...", "blue");

  const dirsToClean = [".next", "node_modules/.cache", "coverage"];

  dirsToClean.forEach((dir) => {
    const fullPath = path.join(PROJECT_ROOT, dir);
    if (fs.existsSync(fullPath)) {
      try {
        execSync(`rm -rf "${fullPath}"`, { cwd: PROJECT_ROOT });
        log(`✅ Cleaned ${dir}`, "green");
      } catch (error) {
        log(`❌ Failed to clean ${dir}`, "red");
      }
    }
  });
}

// Check bundle size
function checkBundleSize() {
  log("\n📦 Checking bundle size...", "blue");

  try {
    log("Building application...", "yellow");
    execSync("npm run build", { stdio: "inherit", cwd: PROJECT_ROOT });

    // Check if .next directory exists and show size
    const nextDir = path.join(PROJECT_ROOT, ".next");
    if (fs.existsSync(nextDir)) {
      const result = execSync(`du -sh "${nextDir}"`, { encoding: "utf8" });
      log(`📊 Build size: ${result.trim()}`, "blue");
    }
  } catch (error) {
    log("❌ Failed to build application", "red");
  }
}

// Main cleanup function
function runCleanup() {
  log("🚀 Starting portfolio cleanup...", "green");

  // Run all checks
  checkUnusedDependencies();
  findTodoComments();
  findConsoleStatements();
  findLargeFiles();
  checkDuplicateCode();

  // Ask user if they want to clean build artifacts
  log("\n❓ Do you want to clean build artifacts? (y/N)", "yellow");

  // For now, just show what would be cleaned
  log("ℹ️  Would clean: .next, node_modules/.cache, coverage", "blue");

  // Check bundle size
  log(
    "\n❓ Do you want to check bundle size? This will run a build. (y/N)",
    "yellow"
  );
  log('ℹ️  Run "npm run build:analyze" to analyze bundle size', "blue");

  log("\n✅ Cleanup analysis complete!", "green");
  log("📋 Summary of recommendations:", "blue");
  log("  • Remove unused dependencies with depcheck", "yellow");
  log("  • Replace console statements with logger utility", "yellow");
  log("  • Review and resolve TODO/FIXME comments", "yellow");
  log("  • Consider code splitting for large files", "yellow");
  log("  • Run bundle analysis regularly", "yellow");
}

// Run the cleanup
runCleanup();
