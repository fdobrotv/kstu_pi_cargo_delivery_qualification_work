/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech) (7.2.0).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
package com.fdobrotv.cargodelivery.api;

import com.fdobrotv.cargodelivery.dto.Error;
import java.util.UUID;
import com.fdobrotv.cargodelivery.dto.WorkSlot;
import com.fdobrotv.cargodelivery.dto.WorkSlotIn;
import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.annotation.Generated;

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-01-07T20:25:02.083454+02:00[Europe/Sofia]")
@Validated
@Tag(name = "workSlots", description = "the workSlots API")
public interface WorkSlotsApi {

    default Optional<NativeWebRequest> getRequest() {
        return Optional.empty();
    }

    /**
     * POST /workSlots : Create a work slot
     *
     * @param workSlotIn  (optional)
     * @return Ok (status code 201)
     *         or unexpected error (status code 200)
     */
    @Operation(
        operationId = "createWorkSlot",
        summary = "Create a work slot",
        tags = { "workSlots" },
        responses = {
            @ApiResponse(responseCode = "201", description = "Ok", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = WorkSlot.class))
            }),
            @ApiResponse(responseCode = "default", description = "unexpected error", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = Error.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.POST,
        value = "/workSlots",
        produces = { "application/json" },
        consumes = { "application/json" }
    )
    
    default ResponseEntity<WorkSlot> createWorkSlot(
        @Parameter(name = "WorkSlotIn", description = "") @Valid @RequestBody(required = false) WorkSlotIn workSlotIn
    ) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"driver\" : { \"car\" : { \"model\" : \"Traveller\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"plateNumber\" : \"A123TH716RUS\", \"mark\" : \"Peugeot\" }, \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"user\" : { \"firstName\" : \"Василий\", \"lastName\" : \"Пупкин\", \"createdAt\" : \"2000-01-23T04:56:07.000+00:00\", \"role\" : \"Driver\", \"phone\" : \"79993336677\", \"middleName\" : \"Веселович\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"email\" : \"vasiliy@pupkin.ru\" } }, \"car\" : { \"model\" : \"Traveller\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"plateNumber\" : \"A123TH716RUS\", \"mark\" : \"Peugeot\" }, \"startedAt\" : \"2000-01-23T04:56:07.000+00:00\", \"startCoordinates\" : { \"latitude\" : 37.61768042058358, \"longitude\" : 55.751059669259625 }, \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"endCoordinates\" : { \"latitude\" : 37.61768042058358, \"longitude\" : 55.751059669259625 }, \"finishedAt\" : \"2000-01-23T04:56:07.000+00:00\" }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }


    /**
     * DELETE /workSlots/{id} : Delete specific work slot by id
     *
     * @param id The id of the resource to delete (required)
     * @return Resource deleted successfully (status code 204)
     *         or unexpected error (status code 200)
     */
    @Operation(
        operationId = "deleteWorkSlotById",
        summary = "Delete specific work slot by id",
        tags = { "workSlots" },
        responses = {
            @ApiResponse(responseCode = "204", description = "Resource deleted successfully"),
            @ApiResponse(responseCode = "default", description = "unexpected error", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = Error.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.DELETE,
        value = "/workSlots/{id}",
        produces = { "application/json" }
    )
    
    default ResponseEntity<Void> deleteWorkSlotById(
        @Parameter(name = "id", description = "The id of the resource to delete", required = true, in = ParameterIn.PATH) @PathVariable("id") UUID id
    ) {
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }


    /**
     * GET /workSlots/{id} : Info for a specific work slot
     *
     * @param id The id of the resource to retrieve (required)
     * @return Expected response to a valid request (status code 200)
     *         or unexpected error (status code 200)
     */
    @Operation(
        operationId = "getWorkSlotById",
        summary = "Info for a specific work slot",
        tags = { "workSlots" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Expected response to a valid request", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = WorkSlot.class))
            }),
            @ApiResponse(responseCode = "default", description = "unexpected error", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = Error.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/workSlots/{id}",
        produces = { "application/json" }
    )
    
    default ResponseEntity<WorkSlot> getWorkSlotById(
        @Parameter(name = "id", description = "The id of the resource to retrieve", required = true, in = ParameterIn.PATH) @PathVariable("id") UUID id
    ) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"driver\" : { \"car\" : { \"model\" : \"Traveller\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"plateNumber\" : \"A123TH716RUS\", \"mark\" : \"Peugeot\" }, \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"user\" : { \"firstName\" : \"Василий\", \"lastName\" : \"Пупкин\", \"createdAt\" : \"2000-01-23T04:56:07.000+00:00\", \"role\" : \"Driver\", \"phone\" : \"79993336677\", \"middleName\" : \"Веселович\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"email\" : \"vasiliy@pupkin.ru\" } }, \"car\" : { \"model\" : \"Traveller\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"plateNumber\" : \"A123TH716RUS\", \"mark\" : \"Peugeot\" }, \"startedAt\" : \"2000-01-23T04:56:07.000+00:00\", \"startCoordinates\" : { \"latitude\" : 37.61768042058358, \"longitude\" : 55.751059669259625 }, \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"endCoordinates\" : { \"latitude\" : 37.61768042058358, \"longitude\" : 55.751059669259625 }, \"finishedAt\" : \"2000-01-23T04:56:07.000+00:00\" }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }


    /**
     * GET /workSlots : List all work slots
     *
     * @param limit How many items to return at one time (max 100) (optional)
     * @return A paged array of car models (status code 200)
     *         or unexpected error (status code 200)
     */
    @Operation(
        operationId = "listWorkSlots",
        summary = "List all work slots",
        tags = { "workSlots" },
        responses = {
            @ApiResponse(responseCode = "200", description = "A paged array of car models", content = {
                @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = WorkSlot.class)))
            }),
            @ApiResponse(responseCode = "default", description = "unexpected error", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = Error.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/workSlots",
        produces = { "application/json" }
    )
    
    default ResponseEntity<List<WorkSlot>> listWorkSlots(
        @Max(100) @Parameter(name = "limit", description = "How many items to return at one time (max 100)", in = ParameterIn.QUERY) @Valid @RequestParam(value = "limit", required = false) Integer limit
    ) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "[ { \"driver\" : { \"car\" : { \"model\" : \"Traveller\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"plateNumber\" : \"A123TH716RUS\", \"mark\" : \"Peugeot\" }, \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"user\" : { \"firstName\" : \"Василий\", \"lastName\" : \"Пупкин\", \"createdAt\" : \"2000-01-23T04:56:07.000+00:00\", \"role\" : \"Driver\", \"phone\" : \"79993336677\", \"middleName\" : \"Веселович\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"email\" : \"vasiliy@pupkin.ru\" } }, \"car\" : { \"model\" : \"Traveller\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"plateNumber\" : \"A123TH716RUS\", \"mark\" : \"Peugeot\" }, \"startedAt\" : \"2000-01-23T04:56:07.000+00:00\", \"startCoordinates\" : { \"latitude\" : 37.61768042058358, \"longitude\" : 55.751059669259625 }, \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"endCoordinates\" : { \"latitude\" : 37.61768042058358, \"longitude\" : 55.751059669259625 }, \"finishedAt\" : \"2000-01-23T04:56:07.000+00:00\" }, { \"driver\" : { \"car\" : { \"model\" : \"Traveller\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"plateNumber\" : \"A123TH716RUS\", \"mark\" : \"Peugeot\" }, \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"user\" : { \"firstName\" : \"Василий\", \"lastName\" : \"Пупкин\", \"createdAt\" : \"2000-01-23T04:56:07.000+00:00\", \"role\" : \"Driver\", \"phone\" : \"79993336677\", \"middleName\" : \"Веселович\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"email\" : \"vasiliy@pupkin.ru\" } }, \"car\" : { \"model\" : \"Traveller\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"plateNumber\" : \"A123TH716RUS\", \"mark\" : \"Peugeot\" }, \"startedAt\" : \"2000-01-23T04:56:07.000+00:00\", \"startCoordinates\" : { \"latitude\" : 37.61768042058358, \"longitude\" : 55.751059669259625 }, \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"endCoordinates\" : { \"latitude\" : 37.61768042058358, \"longitude\" : 55.751059669259625 }, \"finishedAt\" : \"2000-01-23T04:56:07.000+00:00\" }, { \"driver\" : { \"car\" : { \"model\" : \"Traveller\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"plateNumber\" : \"A123TH716RUS\", \"mark\" : \"Peugeot\" }, \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"user\" : { \"firstName\" : \"Василий\", \"lastName\" : \"Пупкин\", \"createdAt\" : \"2000-01-23T04:56:07.000+00:00\", \"role\" : \"Driver\", \"phone\" : \"79993336677\", \"middleName\" : \"Веселович\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"email\" : \"vasiliy@pupkin.ru\" } }, \"car\" : { \"model\" : \"Traveller\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"plateNumber\" : \"A123TH716RUS\", \"mark\" : \"Peugeot\" }, \"startedAt\" : \"2000-01-23T04:56:07.000+00:00\", \"startCoordinates\" : { \"latitude\" : 37.61768042058358, \"longitude\" : 55.751059669259625 }, \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"endCoordinates\" : { \"latitude\" : 37.61768042058358, \"longitude\" : 55.751059669259625 }, \"finishedAt\" : \"2000-01-23T04:56:07.000+00:00\" }, { \"driver\" : { \"car\" : { \"model\" : \"Traveller\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"plateNumber\" : \"A123TH716RUS\", \"mark\" : \"Peugeot\" }, \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"user\" : { \"firstName\" : \"Василий\", \"lastName\" : \"Пупкин\", \"createdAt\" : \"2000-01-23T04:56:07.000+00:00\", \"role\" : \"Driver\", \"phone\" : \"79993336677\", \"middleName\" : \"Веселович\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"email\" : \"vasiliy@pupkin.ru\" } }, \"car\" : { \"model\" : \"Traveller\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"plateNumber\" : \"A123TH716RUS\", \"mark\" : \"Peugeot\" }, \"startedAt\" : \"2000-01-23T04:56:07.000+00:00\", \"startCoordinates\" : { \"latitude\" : 37.61768042058358, \"longitude\" : 55.751059669259625 }, \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"endCoordinates\" : { \"latitude\" : 37.61768042058358, \"longitude\" : 55.751059669259625 }, \"finishedAt\" : \"2000-01-23T04:56:07.000+00:00\" }, { \"driver\" : { \"car\" : { \"model\" : \"Traveller\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"plateNumber\" : \"A123TH716RUS\", \"mark\" : \"Peugeot\" }, \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"user\" : { \"firstName\" : \"Василий\", \"lastName\" : \"Пупкин\", \"createdAt\" : \"2000-01-23T04:56:07.000+00:00\", \"role\" : \"Driver\", \"phone\" : \"79993336677\", \"middleName\" : \"Веселович\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"email\" : \"vasiliy@pupkin.ru\" } }, \"car\" : { \"model\" : \"Traveller\", \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"plateNumber\" : \"A123TH716RUS\", \"mark\" : \"Peugeot\" }, \"startedAt\" : \"2000-01-23T04:56:07.000+00:00\", \"startCoordinates\" : { \"latitude\" : 37.61768042058358, \"longitude\" : 55.751059669259625 }, \"id\" : \"046b6c7f-0b8a-43b9-b35d-6489e6daee91\", \"endCoordinates\" : { \"latitude\" : 37.61768042058358, \"longitude\" : 55.751059669259625 }, \"finishedAt\" : \"2000-01-23T04:56:07.000+00:00\" } ]";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }

}
