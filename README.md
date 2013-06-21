claims [![Build Status](https://travis-ci.org/netsteps/claims.png)](http://travis-ci.org/netsteps/claims)
======

A [nodejs](http://nodejs.org/) API client for federated claims-based authorization, including parsing and validating claims tickets and interacting with claims authorities.

# Background

Claims-based authorization is a natural successor to role-based security. It is ideal for _service-oriented architectures_ wherein independent services perform actions on users' behalf and need an efficient way to trust users` identities, permissions, and security related facts.

Implicit in this claims-based model, a _claims ticket_ flows across the entire call-stack (or request chain). This module does not deal with how the _claims ticket_'s are communicated.

This module handle's round-trip encoding of claims into _claims tickets_. Its primary use is to decodes a claims ticket, verify its content is trusted, and put the content into an easy to use `Claims` object. The `Claims` object can be interrogated to inform business logic about a user's identity, permissions, and security related facts.

From an independent service's perspective, this module provides the means by which it can trust the identity of users and their claims.

# Installing

```bash
npm install claims
```

