# Notes

## Implementation

### Task Creation

- Implemented the creation of tasks. Encountered some issues during testing with the front end due to a JSON parse error, but managed to fix it by ensuring proper json formating see : useFetch.ts

### Task Update

- Initially considered creating separate components for update functionality. However, to save time, decided to use a condition in the create/save functions to distinguish between update and save operations (based on the presence of an ID). This approach is not the best for scalability, as it could make the application harder to maintain and extend in the future.

### Task Deletion

- Implemented task deletion functionality. Encountered issues with updating the task ID, which were resolved by using logging to debug and identify the problem.

### Frontend Integration

- Used Material-UI for the front end to provide a consistent and modern UI/UX.
- Subdivided components to improve code organization and reusability. Faced difficulties in passing props correctly like the component TaskEditor, but managed to resolve them through careful debugging.

## Breakpoints and Decisions

- **JSON Parse Error**: Encountered a JSON parse error during testing. Fixed it by ensuring proper data formatting and handling.
- **Update vs. Save**: Decided to use a condition in the create/save functions to distinguish between update and save operations. This decision was made to save time but is not ideal for scalability.
- **Task ID Issue**: Faced issues with updating the task ID. Resolved it by using logging to debug and identify the problem.
- **Component Subdivision**: Subdivided components to improve code organization and reusability. Faced difficulties in passing props correctly but managed to resolve them through careful debugging and refactoring.

## Conclusion

The implementation involved several key decisions and breakpoints. While some decisions were made to save time, they may impact the scalability and maintainability of the application in the future. The use of Material-UI and Prisma helped streamline the development process and provided a solid foundation for the application. Future improvements could involve refactoring the update and save functions to separate components and enhancing the scalability of the application.
