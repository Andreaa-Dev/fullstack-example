# Fullstack

Fullstack example

### Available Scripts

Step 1:

1. cd `api`
2. `yarn`
3. `yarn start`

Step 2:

1. cd client
1. yarn
1. yarn start

### Notes for Andrea

- database: isa8-demo
- admin: first admin, admin check middleware, make user as admin

## Notes

1. console google developer

## test

1. services: unit test
2. controller: e2e

## CI-CD

code deploy: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-install-ubuntu.html

actions: https://github.com/marketplace?type=actions

yaml

- checkout: pull code from repo => VM
- cache: improve performance
  cache dependencies - first time then next time no need to install those dep

  16.171.18.64

// embed
// embed product =>
// populate => find product => join data from product to order => slow
// 1 order : 2 products
// 3 queries:
// 1: get order
// 2: get product detail 1
// 3: get product detail 2
