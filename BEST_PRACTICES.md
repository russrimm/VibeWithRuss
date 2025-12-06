# Best Practices Guide

A comprehensive guide for working effectively with AI coding assistants, maintaining code quality, and ensuring security in your development workflow.

## Table of Contents

- [GitHub Copilot Instructions](#github-copilot-instructions)
- [Security Best Practices](#security-best-practices)
- [Preventing Common Issues](#preventing-common-issues)
- [Code Quality & Optimization](#code-quality--optimization)
- [Iterative Development Workflow](#iterative-development-workflow)
- [Testing & Debugging](#testing--debugging)

---

## GitHub Copilot Instructions

### Keep Instructions Updated

If the AI agent encounters the same issue repeatedly, update the `.github/copilot-instructions.md` file with specific guidance to prevent that issue from occurring again.

**Example scenarios:**
- Infinite loops during data fetching
- Missing dependency arrays in React hooks
- Incorrect TypeScript types being inferred
- Configuration file formatting issues

**How to update:**
1. Identify the recurring issue
2. Document the solution clearly in copilot-instructions.md
3. Add a rule that prevents the issue (e.g., "Always use SWR for data fetching to prevent infinite loops")
4. Commit the updated instructions

### Include Security Rules in Instructions

Add security-focused rules to your Copilot instructions file:

```markdown
## Security Requirements
- Never commit secrets, API keys, or credentials to the repository
- Always use environment variables for sensitive data
- Validate and sanitize all user inputs
- Use parameterized queries to prevent SQL injection
- Implement proper authentication and authorization checks
- Follow the principle of least privilege
- Keep dependencies updated and run security audits regularly
```

---

## Security Best Practices

### 1. Environment Variables

**DO:**
- Store all secrets in `.env.local` (never `.env`)
- Add `.env.local` to `.gitignore`
- Use descriptive variable names (e.g., `AZURE_AD_CLIENT_SECRET`)
- Document required environment variables in README.md (without values)

**DON'T:**
- Hard-code API keys or passwords
- Commit `.env.local` to version control
- Share secrets in chat logs or screenshots
- Use the same secrets across development and production

### 2. Authentication & Authorization

**DO:**
- Use established authentication libraries (e.g., NextAuth.js)
- Implement server-side session validation
- Use HTTPS in production
- Set appropriate CORS policies
- Implement rate limiting on API endpoints

**DON'T:**
- Roll your own authentication system
- Store passwords in plain text
- Trust client-side validation alone
- Expose sensitive data in API responses

### 3. Dependency Management

**DO:**
- Run `npm audit` regularly and fix vulnerabilities
- Keep dependencies updated
- Review package permissions and reputation before installing
- Use exact versions in production (`package-lock.json`)

**DON'T:**
- Ignore security warnings
- Install packages from untrusted sources
- Use deprecated or unmaintained packages

### 4. Code Security

**DO:**
- Validate all user inputs on the server
- Sanitize data before rendering in HTML
- Use Content Security Policy (CSP) headers
- Implement proper error handling without exposing stack traces

**DON'T:**
- Trust user input
- Expose internal server errors to users
- Use `eval()` or `Function()` with user data
- Store sensitive data in localStorage or cookies without encryption

---

## Preventing Common Issues

### 1. Infinite Loops in React

**Problem:** Components re-render infinitely due to dependency issues or improper data fetching.

**Solutions:**

#### Use SWR for Data Fetching
```typescript
import useSWR from 'swr'

function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher)
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Failed to load</div>
  return <div>Hello {data.name}!</div>
}
```

**Benefits:**
- Automatic revalidation
- Built-in caching
- Prevents infinite loops
- Handles loading and error states

#### Proper useEffect Dependencies
```typescript
// ❌ BAD - Missing dependencies
useEffect(() => {
  fetchData(userId)
}, []) // userId is missing!

// ✅ GOOD - All dependencies included
useEffect(() => {
  fetchData(userId)
}, [userId])
```

### 2. Memoization for Performance

**Problem:** Expensive calculations run on every render.

**Solution:** Use `useMemo` and `useCallback`

```typescript
import { useMemo, useCallback } from 'react'

function ExpensiveComponent({ data, onUpdate }) {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => complexCalculation(item))
  }, [data])
  
  // Memoize callback functions
  const handleUpdate = useCallback((id) => {
    onUpdate(id)
  }, [onUpdate])
  
  return <List data={processedData} onUpdate={handleUpdate} />
}
```

### 3. React Query for Server State

Alternative to SWR with more features:

```typescript
import { useQuery } from '@tanstack/react-query'

function Profile() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 5000, // Data stays fresh for 5 seconds
  })
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return <div>Hello {data.name}!</div>
}
```

### 4. Debouncing User Input

**Problem:** API calls triggered on every keystroke.

**Solution:** Debounce input handlers

```typescript
import { useState, useCallback } from 'react'
import { debounce } from 'lodash'

function SearchBar() {
  const [query, setQuery] = useState('')
  
  // Debounce search function
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      // API call here
      fetchResults(searchTerm)
    }, 500),
    []
  )
  
  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    debouncedSearch(value)
  }
  
  return <input value={query} onChange={handleChange} />
}
```

### 5. Avoiding Memory Leaks

**Problem:** Subscriptions, timers, or event listeners not cleaned up.

**Solution:** Use cleanup functions

```typescript
useEffect(() => {
  const subscription = dataSource.subscribe()
  const timer = setInterval(() => {
    console.log('Tick')
  }, 1000)
  
  // Cleanup function
  return () => {
    subscription.unsubscribe()
    clearInterval(timer)
  }
}, [])
```

---

## Code Quality & Optimization

### Regular Code Review Checklist

Ask GitHub Copilot to analyze your codebase with these prompts:

#### 1. Top 5 High-Impact, Low-Risk Improvements

**Prompt:**
```
Review all code and identify the top 5 most positively impactful changes 
that can be made with the least risk. Prioritize:
- Performance improvements
- Code readability
- Type safety
- Error handling
- Accessibility

List them in order of impact vs. risk ratio.
```

**Workflow:**
1. Get the list of improvements
2. Implement one change at a time
3. Test thoroughly
4. Commit with descriptive message
5. Move to next improvement

#### 2. Performance Optimization Review

**Prompt:**
```
Review the entire codebase for performance optimizations. Look for:
- Unnecessary re-renders
- Missing memoization opportunities
- Inefficient algorithms or data structures
- Large bundle sizes
- Unoptimized images
- Missing lazy loading
- Redundant API calls
- Heavy synchronous operations

Provide specific file paths and line numbers with suggested fixes.
```

#### 3. Security Audit

**Prompt:**
```
Conduct a security audit of the codebase. Check for:
- Exposed secrets or API keys
- Unsanitized user inputs
- Missing authentication checks
- Vulnerable dependencies
- Insecure data storage
- Missing rate limiting
- CORS misconfigurations
- SQL injection vulnerabilities

Flag all security issues with severity levels.
```

#### 4. Code Cleanup

**Prompt:**
```
Review the codebase and identify:
- Unused imports
- Dead code (unreachable)
- Commented-out code that should be removed
- Console.log statements
- Debugging code
- Duplicate code that should be abstracted
- Magic numbers that should be constants

Provide a cleanup plan ordered by priority.
```

#### 5. TypeScript Type Safety

**Prompt:**
```
Review all TypeScript code for type safety improvements:
- Replace 'any' types with proper types
- Add missing type annotations
- Create interfaces for complex objects
- Use union types where appropriate
- Add type guards for runtime checks
- Fix type assertion misuse

List all issues with file paths and suggested fixes.
```

---

## Iterative Development Workflow

### The "Review, Implement, Test, Commit" Cycle

Follow this workflow for systematic code improvements:

```bash
# 1. Review Phase
# Ask Copilot to review code and suggest improvements
# Document the top 5 changes

# 2. Implementation Phase (ONE CHANGE AT A TIME)
# Implement the first improvement
# Keep changes focused and atomic

# 3. Testing Phase
npm run dev
# Manually test the change
# Run automated tests if available
npm test

# 4. Commit Phase
git add .
git commit -m "feat: add memoization to ProductList component"
git push

# 5. Repeat
# Move to the next improvement
# Continue the cycle
```

### Commit Message Best Practices

Use conventional commit format:

```bash
feat: add new feature
fix: bug fix
perf: performance improvement
refactor: code refactoring
docs: documentation changes
style: formatting changes
test: adding tests
chore: maintenance tasks
```

**Examples:**
```bash
git commit -m "perf: memoize expensive calculations in Dashboard"
git commit -m "fix: prevent infinite loop in useEffect data fetching"
git commit -m "refactor: extract duplicate form validation logic"
git commit -m "chore: remove debugging console.log statements"
```

---

## Testing & Debugging

### 1. Remove Debugging Code Before Production

**Before deploying, search for and remove:**
- `console.log()` statements
- `console.error()` for non-critical errors
- `debugger` statements
- Test/mock data
- Commented-out code
- Development-only features

**Prompt for Copilot:**
```
Search the entire codebase for debugging code that should be removed:
- console.log/error/warn statements
- debugger statements
- commented code blocks
- TODO/FIXME comments
- test data or mock responses

List all occurrences with file paths and line numbers.
```

### 2. Implement Proper Logging

**Instead of console.log, use a proper logging solution:**

```typescript
// logger.ts
const isDevelopment = process.env.NODE_ENV === 'development'

export const logger = {
  info: (message: string, meta?: any) => {
    if (isDevelopment) {
      console.log(`[INFO] ${message}`, meta)
    }
    // Send to logging service in production
  },
  error: (message: string, error?: Error) => {
    if (isDevelopment) {
      console.error(`[ERROR] ${message}`, error)
    }
    // Send to error tracking service (e.g., Sentry)
  },
  warn: (message: string, meta?: any) => {
    if (isDevelopment) {
      console.warn(`[WARN] ${message}`, meta)
    }
  }
}
```

### 3. Testing Checklist

Before committing changes:

- [ ] Code runs without errors
- [ ] No console errors in browser
- [ ] All features work as expected
- [ ] Responsive design works on mobile
- [ ] Forms validate correctly
- [ ] Authentication flow works
- [ ] Error states display properly
- [ ] Loading states show correctly
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Fast page load times
- [ ] No memory leaks (check DevTools)

### 4. Browser DevTools Usage

**Check for issues:**
1. **Console Tab:** Look for errors and warnings
2. **Network Tab:** Check for failed requests, slow APIs
3. **Performance Tab:** Identify render bottlenecks
4. **Memory Tab:** Check for memory leaks
5. **Lighthouse:** Run audit for performance, accessibility, SEO

---

## Quick Reference: Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm audit            # Check for vulnerabilities
npm audit fix        # Fix vulnerabilities automatically
```

### Git Workflow
```bash
git status           # Check current changes
git add .            # Stage all changes
git commit -m "msg"  # Commit with message
git push             # Push to remote
git pull             # Pull latest changes
```

### Cleanup
```bash
rm -rf .next node_modules    # Clean build artifacts
npm install                   # Reinstall dependencies
npm run build                 # Rebuild project
```

---

## Summary

1. **Keep Copilot instructions updated** with solutions to recurring issues
2. **Embed security best practices** in your workflow and instructions
3. **Use proper patterns** (SWR, memoization, debouncing) to prevent common issues
4. **Review code regularly** using AI to identify improvements
5. **Work iteratively**: implement, test, commit, repeat
6. **Remove debugging code** before production
7. **Test thoroughly** after every change

By following these best practices, development will be more efficient, code will be more maintainable, and the application will be more secure and performant.

---

**Need help?** Ask GitHub Copilot to review specific aspects of the codebase using the prompts provided in this guide.
