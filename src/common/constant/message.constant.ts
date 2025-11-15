const generateMsg = (entity : string)=> ({
    notFound : `${entity} not found`,
    alreadyExists : `${entity} already exists`,
    invalidId : `Invalid ${entity.toLowerCase()} id`,
    required : `${entity} is required`,
    removedSuccess : `${entity} removed successfully`,
    updatedSuccess : `${entity} updated successfully`,
    createdSuccess : `${entity} created successfully`,
    deletedSuccess : `${entity} deleted successfully`,
    unAuthorized : `Unauthorized to access this ${entity.toLowerCase()}`,
    faildToCreate : `Failed to create ${entity.toLowerCase()}`,
    faildToUpdate : `Failed to update ${entity.toLowerCase()}`,
    faildToDelete : `Failed to delete ${entity.toLowerCase()}`,
    
})

export const MessageConstant = {
    Category : {...generateMsg('Category')},
    Brand : {...generateMsg('Brand')},
    Product : {...generateMsg('Product')},
    Coupon : {...generateMsg('Coupon')},
    Order : {...generateMsg('Order')},
    User : {...generateMsg('User')},};